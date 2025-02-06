const express = require('express');
const router = express.Router();

const controller = require('../controllers/main_controllers.js');
const { isLoggedIn, isNotLoggedIn, savingsValidate, validate } = require('../../TrackMint/middleware.js');
const catch_async = require('../utilities/async_wrapper.js');

// Most specific routes first
router.route('/data/:id/manage/:documentId')
    .get(isLoggedIn, catch_async(controller.getEditPage))
    .put(isLoggedIn, validate, catch_async(controller.edit));

router.delete('/data/:id/manage/:documentId', isLoggedIn, catch_async(controller.delete));

router.get('/data/:id/manage', isLoggedIn, catch_async(controller.getManagePage));

router.route('/data')
    .get(isLoggedIn, controller.data)
    .post(isLoggedIn, validate, catch_async(controller.addData));

router.route('/:id/savings')
    .get(isLoggedIn, catch_async(controller.savings))
    .post(isLoggedIn, savingsValidate, catch_async(controller.addMoney))
    .put(isLoggedIn, savingsValidate, catch_async(controller.minusMoney));

router.get('/:id/journal', isLoggedIn, catch_async(controller.journal));
router.post('/:id/journal/note', isLoggedIn, catch_async(controller.note));

router.get('/:id/dashboard', isLoggedIn, catch_async(controller.userDashboard));

// Most general route last
router.get('/', isNotLoggedIn, catch_async(controller.dashboard));

module.exports=router;