const express = require('express');
const router=express.Router();

const controller=require('../controllers/main_controllers.js');
const { isLoggedIn, isNotLoggedIn } = require('../../TrackMint/middleware.js');

router.get('/',isNotLoggedIn, controller.dashboard)

router.route('/data')
    .get(isLoggedIn, controller.data)
    .post(isLoggedIn,controller.addData)

router.get('/:id/dashboard', isLoggedIn, controller.userDashboard)

router.get('/:id/journal', isLoggedIn, controller.journal)

router.route('/:id/savings')
    .get(isLoggedIn, controller.savings)
    .post(isLoggedIn, controller.addMoney)
    .put(isLoggedIn, controller.minusMoney)

router.post('/:id/journal/note', isLoggedIn, controller.note)

router.route('/data/:id/manage')
    .get(isLoggedIn, controller.getManagePage)
    
router.delete('/data/:id/manage/:documentId',isLoggedIn,controller.delete)
router.route('/data/:id/manage/:documentId')
    .get(isLoggedIn, controller.getEditPage)
    .put(isLoggedIn, controller.edit)

module.exports=router;