const express=require('express');
const user=require('./models/user_model.js');
const data=require('./models/data_model.js');

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // Check Passport's isAuthenticated method
        req.session.returnTo = req.originalUrl; // Save the URL the user was trying to access
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

module.exports = { isLoggedIn, isNotLoggedIn, storeReturnTo};