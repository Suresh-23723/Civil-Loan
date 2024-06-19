const express = require('express');
const router = express.Router();
const reqModel = require('../models/request');

router.post('/reqs', async (req, res) => {
    try {
        const reqs = await reqModel.find(
            { mobile: req.body.mobile },
            { _id: 0, __v: 0}
        );

        if(reqs.length > 0) {
            res.status(200).json({
                status: 'success',
                message: 'User has some loan requests',
                loans : reqs
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'User has no loan requests'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
})
router.put('/update', async (req, res) => {
    try {
        const nreq = await reqModel.findOneAndUpdate(
            {
                mobile: req.body.mobile,
                code: req.body.code
            },
            req.body
        );
        if(nreq != null) {
            res.status(201).json({
                status: 'success',
                message: 'Thanks for your request Updation. Our Executive will contact you soon.'
            });
        } else {
            res.status(400).json({
                status: 'details-mismatch',
                message: 'Check your mobile number and service type'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.delete('/delete', async(req, res) => {
    try {
        const delReq = await reqModel.deleteOne({ 
            mobile: req.body.mobile,
            code: req.body.type
        });
        
        if(delReq.deletedCount == 0) {
            res.json(400).json({ 
                status: 'details-mismatch',
                message: 'Check your mobile number and service type'
            });
        } else {
            res.status(200).json({ 
                status: 'success',
                message: 'Deleted successfully'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

module.exports = router;