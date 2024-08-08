const Skarpette = require('../models/skarpette');
const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWSREGION,
    endpoint: `https://s3.${process.env.AWSREGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWSACCESSKEYID,
        secretAccessKey: process.env.AWSSECRETACCESSKEY,
    },
});

async function uploadImageToS3(buffer, destination) {
    const params = {
        Bucket: process.env.AWSBUCKETNAME,
        Key: destination,
        Body: buffer,
    };

    const command = new PutObjectCommand(params);

    try {
        const data = await s3Client.send(command);
        return `https://${params.Bucket}.s3.${process.env.AWSREGION}.amazonaws.com/${destination}`;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
}
async function deleteImageFromS3(imageUrl) {
    const params = {
        Bucket: process.env.AWSBUCKETNAME,
        Key: imageUrl.split(
            `${process.env.AWSBUCKETNAME}.s3.${process.env.AWSREGION}.amazonaws.com/`
        )[1],
    };

    const command = new DeleteObjectCommand(params);

    try {
        const data = await s3Client.send(command);
        return data;
    } catch (error) {
        console.error('Error deleting image from S3:', error);
        throw error;
    }
}
async function generateUniqueVendorCode() {
    let vendorCode;
    let isUnique = false;

    while (!isUnique) {
        vendorCode = Math.floor(1000000 + Math.random() * 9000000);
        const existingSkarpette = await Skarpette.findOne({
            vendor_code: vendorCode,
        });
        if (!existingSkarpette) {
            isUnique = true;
        }
    }

    return vendorCode;
}

const findSkarpettesByCriteria = async (criteria, res) => {
    try {
        const skarpettes = await Skarpette.find(criteria);
        if (!skarpettes || skarpettes.length === 0) {
            return res.status(404).json('Skarpettes not found');
        }
        res.status(200).json(skarpettes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createSkarpette = async (req, res) => {
    try {
        const skarpetteData = req.body;
        skarpetteData.images_urls = [];

        skarpetteData.vendor_code = await generateUniqueVendorCode();

        // Upload images
        if (req.files && req.files.length > 0) {
            const images = req.files;
            const imagesUrls = await Promise.all(
                images.map(async (file) => {
                    const imageUrl = await uploadImageToS3(
                        file.buffer,
                        `images/${file.originalname}`
                    );
                    return imageUrl;
                })
            );
            skarpetteData.images_urls = imagesUrls;
        }

        if (skarpetteData.images_urls.length === 0) {
            throw new Error('At least one image is required');
        }

        if (!skarpetteData.size || skarpetteData.size.length === 0) {
            const sizesByType = getSizesByType(skarpetteData.type);
            skarpetteData.size = sizesByType;
        }

        const newSkarpette = await Skarpette.create(skarpetteData);
        res.status(201).json(newSkarpette);
    } catch (error) {
        console.error('Error creating skarpette:', error);
        res.status(400).json({ error: error.message });
    }
};
const getSkarpetteById = async (req, res) => {
    const { id } = req.params;
    try {
        const skarpette = await Skarpette.findById(id);
        if (!skarpette) {
            return res.status(404).json('Skarpette not found');
        }
        res.status(200).json(skarpette);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAllSkarpettes = async (req, res) => {
    //Skarpettes?
    try {
        if (req.query.filter) {
            return res
                .status(400)
                .json({ error: 'There should not be any query parameters' });
        }
        const skarpettes = await Skarpette.find();
        if (!skarpettes) {
            return res.status(404).json('Skarpettes not found');
        }
        res.status(200).json(skarpettes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getNewSkarpettes = async (req, res) => {
    await findSkarpettesByCriteria({ is_new: true }, res);
};
const getFavotireSkarpettes = async (req, res) => {
    await findSkarpettesByCriteria({ is_favorite: true }, res);
};
const updateSkarpette = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        let skarpette = await Skarpette.findById(id);
        if (!skarpette) {
            return res.status(404).json({ error: 'Skarpette not found' });
        }
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) {
                skarpette[key] = updates[key];
            }
        });
        const updatedSkarpette = await skarpette.save();
        res.status(200).json(updatedSkarpette);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteSkarpette = async (req, res) => {
    const { id } = req.params;
    try {
        const skarpette = await Skarpette.findById(id);
        if (!skarpette) {
            return res.status(404).json({ error: 'Skarpette not found' });
        }

        const deletePromises = skarpette.images_urls.map((imageUrl) =>
            deleteImageFromS3(imageUrl)
        );
        await Promise.all(deletePromises);

        await skarpette.deleteOne();
        res.status(200).json('Skarpette has been deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getSkarpettesByNameOrVendorCode = async (req, res) => {
    const { name, vendor_code } = req.query;
    try {
        let skarpettes;

        if (name) {
            skarpettes = await Skarpette.find({
                name: { $regex: new RegExp(name, 'i') },
            });
        } else if (vendor_code) {
            const vendorCode = parseInt(vendor_code);
            if (isNaN(vendorCode)) {
                return res
                    .status(400)
                    .json({ error: 'Invalid vendor code format' });
            }
            skarpettes = await Skarpette.find({ vendor_code: vendorCode });
        } else {
            return res
                .status(400)
                .json({ error: 'No search parameters provided' });
        }

        if (skarpettes.length === 0) {
            return res.status(404).json('Skarpettes not found');
        }
        res.status(200).json(skarpettes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getFilteredSkarpettes = async (req, res) => {
    try {
        const { type } = req.query;

        let filter = { is_in_stock: true };

        if (type) {
            filter.type = type;
        }

        await findSkarpettesByCriteria(filter, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const clearDB = async (req, res) => {
    try {
        await Skarpette.deleteMany({});
        res.status(200).json({
            message: 'Skarpette collection cleared successfully.',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createSkarpette,
    deleteSkarpette,
    getSkarpetteById,
    getAllSkarpettes,
    updateSkarpette,
    getSkarpettesByNameOrVendorCode,
    getFilteredSkarpettes,
    clearDB,
    getNewSkarpettes,
    getFavotireSkarpettes,
};
