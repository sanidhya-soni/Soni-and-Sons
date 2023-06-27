const UserModel = require('../models/User_Model');
const bcrypt = require("bcrypt");
const JWTHelp = require("../services/jwt_helper");

class User_Controller {
    static async getUserDetails(req, res) {
        if (req.body == undefined || typeof req.body == undefined) {
            res.statusCode = 400;
            return res.json({ message: "No body provided" });
        }
        try {
            const user = await UserModel.getUserById(req.userID.S);
            // console.log(req.userID.S);
            return res.send(user);
          } catch (err) {
            res.statusCode = 500;
            console.log(err);
            return res.send(err);
          }
    }
}

module.exports = User_Controller;
