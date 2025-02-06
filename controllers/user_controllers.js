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
    req.flash('success','Welcome to TrackMint!')
    res.redirect(`/trackmint/data`);}

    catch(e){
        req.flash('error','There was en an error while registering you!')
        console.log(e);
    }
}

module.exports.login=(req,res)=>{
    res.render('login.ejs');
}

module.exports.loginPost=(req,res)=>{
    try{
        const redirectUrl=res.locals.returnTo || '/trackmint';
        delete res.locals.returnTo;
        req.flash('success','Welcome back to TrackMint!')
        res.redirect(`/trackmint/${req.user._id}/dashboard`);
    }
    catch(e){
        req.flash('error','There was en error loggin you in!')
        res.redirect('/trackmint')
    }
}

module.exports.logout=(req,res)=>{
    if(req.isAuthenticated()){
        req.logout(function(err){
            if(err){
                return next(err);
            }
            req.flash('success',"You've been logged out!")
            res.redirect('/trackmint');
        });
    }
    else{
        req.flash('success',"You can't logout yet!")
        res.redirect('/trackmint');
    }
}

module.exports.addData

