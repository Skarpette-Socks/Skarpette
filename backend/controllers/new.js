const New = require("../models/new");
const Skarpette = require("../models/skarpette");

const createNew = async (req, res) => {
    const {vendor_code} = req.params;
    try {
        const foundSkarpette = await Skarpette.findOne({vendor_code});
        if (!foundSkarpette) {
            return res.status(404).json('Skarpette not found');
        }
        const existingNew = await New.findOne({skarpetteVendorCode: vendor_code});
        if (existingNew) {
            return res.status(400).json('New already exists');
        }
        const newCount = await New.countDocuments();
        if (newCount >= 4) {
            return res.status(400).json('News are full');
        }
        //?
        const newNew = await New.create({
            skarpetteId: foundSkarpette._id,
            skarpetteVendorCode: vendor_code
        });
        res.status(201).json(newNew);
    } catch(error) {
        console.error('Error creating nes:', error);
        res.status(500).json({ error: error.message });
    }
}

const getAllNews = async (req,res) => {
    try {
        const news = await New.find();
        if (!news.length) {
            return res.status(404).json('No news found');
        }
        const skarpettes = await Promice.all(
            //????
            news.map(async (neww) => {
                return await Skarpette.findById(neww.skarpetteId);
            })
        );
        res.status(200).json(skarpettes);
    } catch (error) {
        console.error('Error getting news:', error);
        res.status(500).json({ error: error.message });
    }
}

const getNewByVendorCode = async (req,res) => {
    const {vendor_code} = req.params;
    try {
        //??????
        const neww = await New.findOne({skarpetteVendorCode: vendor_code});
        if (!neww) {
            return res.status(404).json('New not found');
        }
        const skarpette = await Skarpette.findById(neww.skarpetteId);
        if (!skarpette) {
            return res.status(404).json('Skarpette not found');
        }
        res.status(200).json(neww);
    }
    catch (error) {
        console.error('Error creating new:', error);
        res.status(500).json({ error: error.message });
    }
}

const deleteNew = async (req,res) => {
    const { id } = req.params;
    try {
        //?????????????????????????????????????????
        const neww = await New.findById(id);
        if (!neww) {
            return res.status(404).json('New not found');
        }
        await neww.deleteOne();
        res.status(200).json('New has been deleted');
    } catch (error) {
        console.error('Error deleting new:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createNew,
    getAllNews,
    getNewByVendorCode,
    deleteNew
}