const express = require('express');
const router=express.Router();

const controller=require('../controllers/main_controllers.js');
const { isLoggedIn, isNotLoggedIn } = require('../../TrackMint/middleware.js');

router.get('/',isNotLoggedIn, controller.dashboard)

router.route('/data')
    .get(isLoggedIn, controller.data)
    .post(isLoggedIn,controller.addData)

router.get('/:id/dashboard', isLoggedIn, controller.userDashboard)


module.exports=router;