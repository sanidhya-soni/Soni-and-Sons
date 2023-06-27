const express = require('express');
const User_Controller = require('../controllers/User_Controller');
const JWTHelp = require("../services/jwt_helper");

const router = express.Router();

router.get('/get-user', JWTHelp.checkToken, User_Controller.getUserDetails);


module.exports = router;
