const express=require('express');
const user=require('./models/user_model.js');
const data=require('./models/data_model.js');
const savings=require('./models/savings_model.js')
const BaseJoi=require('joi');
const ExpressError = require('./utilities/express_error.js');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(), // Base type is Joi string
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!', // Custom error message
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, { 
                    allowedTags: [], // No tags allowed
                    allowedAttributes: {}, // No attributes allowed
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value }); // Error if HTML is found
                return clean; // Return sanitized value
            },
        },
    },
});

const joi = BaseJoi.extend(extension);

const validate = (req, res, next) => {
    const dataSchema = joi.object({
        'date.month': joi.string().required(),
        'date.year': joi.number().required(),
        'earnings.amount': joi.array().items(joi.number().allow('')),
        'earnings.category': joi.array().items(joi.string().allow('')),
        'expenses.amount': joi.array().items(joi.number().allow('')),
        'expenses.category': joi.array().items(joi.string().allow('')),
        'notes': joi.string().allow('').optional()
    }).options({ allowUnknown: true });

    console.log('Request Body:', req.body); // Debug log

    const { error } = dataSchema.validate(req.body);
    if (error) {
        console.log('Validation Error:', error.details); // Debug log
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

const savingsValidate = (req, res, next) => {
    const savingsSchema = joi.object({
        amount: joi.number().required() // Assuming you're sending amount in the request body
    });
    
    const { error } = savingsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // Check Passport's isAuthenticated method
        req.session.returnTo = req.originalUrl; // Save the URL the user was trying to access
        req.flash('success','Please Login to Continue')
        return res.redirect('/trackmint/login'); // Redirect to login page
    }
    next(); // Proceed if authenticated
};

const isNotLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect(`/trackmint/${req.user._id}/dashboard`)
    }
    next();
}

const storeReturnTo=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo=req.session.returnTo;
    }
    next();
}



module.exports = { isLoggedIn, isNotLoggedIn, storeReturnTo, validate, savingsValidate};