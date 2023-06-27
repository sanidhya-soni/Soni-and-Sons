const express = require('express');
const Auth_Controller = require('../controllers/Auth_Controller');

const router = express.Router();

router.post('/signup', Auth_Controller.registerUser);
router.post('/login', Auth_Controller.loginUser);
// router.post('/forgot-password', Auth_Controller.forgotPassword);
// router.post('/change-password', Auth_Controller.changePassword);
// router.get('/refresh', Auth_Controller.refresh);

module.exports = router;
