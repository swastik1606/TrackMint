const express = require('express');
const user=require('../models/user_model.js');

module.exports.register=(req,res)=>{
    res.render('reg.ejs');
}

module.exports.regPost=async (req,res)=>{
    try{const {username,email,password}=req.body;
    const newUser=new user({username,email});
    const regUser=await user.register(newUser,password);

    await new Promise((resolve,reject)=>{
        req.login(regUser,err=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    });
    const id= req.user._id;
    res.redirect(`/trackmint/data`);}

    catch(e){
        console.log(e);
    }
}

module.exports.login=(req,res)=>{
    res.render('login.ejs');
}

module.exports.loginPost=(req,res)=>{
    const redirectUrl=res.locals.returnTo || '/trackmint';
    delete res.locals.returnTo; 
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    if(req.isAuthenticated()){
        req.logout(function(err){
            if(err){
                return next(err);
            }
            res.redirect('/trackmint');
        });
    }
    else{
        res.redirect('/trackmint');
    }
}

module.exports.addData

