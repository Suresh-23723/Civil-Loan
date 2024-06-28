const express = require('express');
const validators = require('../utilities/validator');
const memModel = require('../models/member');
const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        if(validators.validateMobileNumber(req.body.mobile) && 
        validators.validateEmail(req.body.email)) {
            const oldMem = await memModel.find(
                { mobile: req.body.mobile },
                { _id: 0, __v: 0}
            );

            if(oldMem.length > 0) {
                res.status(200).json({ 
                    status: 'Already-exists',
                    message: 'Member already exits. Try with different mobile number'
                });
            } else {
                const newMem = await memModel.create(req.body);
                res.status(201).json({ 
                    status: 'Success',
                    message: 'Your account has been created successfully'
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
            status: 'fail',
            message: err.message,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        
        const oldMem = await memModel.find(
            { mobile: req.body.mobile },
            { _id: 0, __v: 0}
        );

        if(oldMem.length > 0) {

            if(oldMem[0].password === req.body.password) {
                res.status(200).json({ 
                    status: 'success',
                    message: 'The user is valid',
                    user : oldMem[0]
                });
            } else {
                res.status(400).json({ 
                    status: 'Password-error',
                    message: 'Password does not match'
                });
            }
        } else {
            res.status(400).json({ 
                status: 'User-not-found',
                message: 'Please sign-up with your mobile number',
            });
        } 
    } catch (err) {
        res.status(404).json({ 
            status: 'fail',
            message: err.message,
        });
    }
});

router.put('/updatepassword', async (req,res) => {
    try {
        const nmem = await memModel.findOneAndUpdate(
            {
                mobile: req.body.mobile,
                password: req.body.oldpassword
            },
            req.body
        );
        if(nmem != null) {
            res.status(201).json({
                status: 'success',
                message: 'Your password has been changed successfully'
            });
        } else {
            res.status(400).json({
                status: 'details-mismatch',
                message: 'Check your mobile number and password'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

router.delete('/cancelmember', async (req, res) => {
    try {
        const delMem = await memModel.deleteOne({ 
            mobile: req.body.mobile,
            password: req.body.password
        });
        if(delMem.deletedCount == 0) {
            res.status(400).json({ 
                status: 'details-mismatch',
                message: 'Check your mobile number and password'
            });
        } else {
            res.status(200).json({ 
                status: 'success',
                message: 'Membership has been cancelled for this number'
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