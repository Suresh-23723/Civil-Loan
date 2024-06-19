const express = require('express');
const router = express.Router();
const servModel = require('../models/service');
const reqModel = require('../models/request');
const validators = require('../utilities/validator');

router.get('/:type', async (req, res) => {
    try{
        const service = await servModel.find(
            { code: req.params.type },
            { _id: 0, __v: 0 }
        );
        if(service.length > 0) {
            res.status(200).json({
                status: 'success',
                data: {
                    service,
                }
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Service not found' 
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'error',
            message: err,
        });
    }
});

router.post('/:type/form', async (req, res) => {
    try {
        if(validators.validateMobileNumber(req.body.mobile) && 
        validators.validateEmail(req.body.email)) {
            const oldReq = await reqModel.find( {
                $and: [
                    { mobile: req.body.mobile },
                    { code : req.body.code },
                ]}
            );

            if(oldReq.length > 0) {
                res.status(200).json({ 
                    status: 'Already-exists',
                    message: 'Your request was already submitted for this service. Try with different contact number'
                });
            } else {
                const newReq = await reqModel.create(req.body);
                res.status(201).json({ 
                    status: 'Success',
                    message: 'Thanks for your request. Our Executive will contact you soon'
                });
            }
        } else if(!validators.validateMobileNumber(req.body.mobile)) {
            res.status(400).json({ 
                status: 'Mobile-error',
                message: 'Invalid Mobile Number'
            });
        } else if(!validators.validateEmail(req.body.email)) {
            res.status(400).json({ 
                status: 'Email-error',
                message: 'Invalid Email'
            });
        }
    } catch (err) {
        res.status(404).json({ 
            status: 'Fail',
            message: err.message,
        });
    }
});

router.post('/:type/calculate', async (req, res) => {
    try {
        const service = await servModel.find(
            {code: req.params.type},
            { _id: 0, __v: 0 },
        );
        const amt = parseInt(req.body.amount);
        const duration = parseInt(req.body.duration);
        const rate = service[0].rateOfEMI;
        if(amt < service[0].loanMin) {
            res.status(400).json({
                status: 'min-amount',
                message: 'Entered amount is less than the minimum amount'
            });
        } else if(amt > service[0].loanMax) {
            res.status(400).json({
                status: 'max-amount',
                message: 'Entered amount is more than the maximum amount'
            });
        } else {
            let emi = Math.floor((amt*rate)*((Math.pow(1+rate,duration))/ ((Math.pow(1+rate,duration))-1)));
            res.status(200).json({
                status: 'success',
                EMI: emi
            });
        }
    } catch (err) {
        res.status(404).json({ 
            status: 'fail',
            message: err.message,
        });
    }
});

module.exports = router;