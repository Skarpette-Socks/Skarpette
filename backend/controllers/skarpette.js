const Skarpette = require('../models/skarpette');

const createSkarpette = async (req, res) => {
    try {
        const skarpetteData = req.body;
        const newSkarpette = await Skarpette.create(skarpetteData);
        res.status(201).json(newSkarpette);
    } catch (error) {
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
        const skarpettes = await Skarpette.find();
        if (!skarpettes) {
            return res.status(404).json('Skarpettes not found');
        }
        res.status(200).json(skarpettes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

module.exports = {
    createSkarpette,
    deleteSkarpette,
    getSkarpetteById,
    getAllSkarpettes,
    updateSkarpette,
    getSkarpettesByNameOrVendorCode,
};
