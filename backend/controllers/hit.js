const Hit = require('../models/hit');
const Skarpette = require('../models/skarpette');

const createHit = async (req, res) => {
    const { vendor_code } = req.params;
    try {
        const foundSkarpette = await Skarpette.findOne({ vendor_code });
        if (!foundSkarpette) {
            return res.status(404).json('Skarpette not found');
        }
        const existingHit = await Hit.findOne({
            skarpetteVendorCode: vendor_code,
        });
        if (existingHit) {
            return res.status(400).json('Hit already exists');
        }
        const hitCount = await Hit.countDocuments();
        if (hitCount >= 4) {
            return res.status(400).json('Hits are full');
        }
        const newHit = await Hit.create({
            skarpetteId: foundSkarpette._id,
            skarpetteVendorCode: vendor_code,
        });
        res.status(201).json(newHit);
    } catch (error) {
        console.error('Error creating hit:', error);
        res.status(500).json({ error: error.message });
    }
};

const getAllHits = async (req, res) => {
    try {
        const hits = await Hit.find();
        if (!hits) {
            return res.status(404).json('No Hits found');
        }

        const validHitsWithSkarpettes = await Promise.all(
            hits.map(async (hit) => {
                const skarpette = await Skarpette.findById(hit.skarpetteId);
                if (!skarpette) {
                    await Hit.findByIdAndDelete(hit._id);
                    return null;
                }
                return { hitId: hit._id, skarpette };
            })
        );
        const response = validHitsWithSkarpettes.filter(
            (item) => item !== null
        );
        res.status(200).json(response);
    } catch (error) {
        console.error('Error getting hits:', error);
        res.status(500).json({ error: error.message });
    }
};

const getHitByVendorCode = async (req, res) => {
    const { vendor_code } = req.params;
    try {
        const hit = await Hit.findOne({ skarpetteVendorCode: vendor_code });
        if (!hit) {
            return res.status(404).json('Hit not found');
        }
        const skarpette = await Skarpette.findById(hit.skarpetteId);
        if (!skarpette) {
            return res.status(404).json('Skarpette not found');
        }
        res.status(200).json(skarpette);
    } catch (error) {
        console.error('Error getting hit:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteHit = async (req, res) => {
    const { id } = req.params;
    try {
        const hit = await Hit.findById(id);
        if (!hit) {
            return res.status(404).json('Hit not found');
        }
        await hit.deleteOne();
        res.status(200).json('Hit has been deleted');
    } catch (error) {
        console.error('Error deleting hit');
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHit,
    getAllHits,
    getHitByVendorCode,
    deleteHit,
};
