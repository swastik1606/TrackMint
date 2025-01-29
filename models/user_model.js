const express=require('express');
const { Schema }=require('mongoose');
const data= require('./data_model.js');
const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    data: [{
        type: Schema.Types.ObjectId,
        ref: 'Data'
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);