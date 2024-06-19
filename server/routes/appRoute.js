const express = require('express');
const servModel = require('../models/service');
const router = express.Router();

router.get('/home', async (req, res) => {
    try {
        const services = await servModel.find({}, { _id: 0, __v: 0 });
        if(services.length > 0) {
            res.status(200).json({
                status: 'success',
                length: services.length,
                data: {
                    services,
                }
            });
        } else {
            res.status(400).json({
                status: 'fail',
                data: {
                    message: 'No services available',
                },
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
});

router.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Invalid path',
      });
});

module.exports = router;

