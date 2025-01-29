const express=require('express');
const router=express.Router();
const passport=require('passport');
const { storeReturnTo }=require('../middleware.js');

const userController=require('../controllers/user_controllers.js');

router.route('/register')
    .get(userController.register)
    .post(userController.regPost);

router.route('/login')
    .get(storeReturnTo, userController.login)
    .post(passport.authenticate('local', {
        failureRedirect: '/trackmint/login'
    }),userController.loginPost);

router.get('/logout',userController.logout);

module.exports=router;