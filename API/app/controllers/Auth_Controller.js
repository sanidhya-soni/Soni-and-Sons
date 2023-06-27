const UserModel = require('../models/User_Model');
const bcrypt = require("bcrypt");
const JWTHelp = require("../services/jwt_helper");

class Auth_Controller {

    static async registerUser(req, res) {

        if (req.body == undefined || typeof req.body == undefined) {
            res.statusCode = 400;
            return res.json({ message: "No body provided" });
        }
        const {
            user_name,
            first_name,
            last_name,
            contact_no,
            email,
            password,
            sec_ques,
            sec_ans
        } = req.body;

        if (!user_name || typeof user_name !== "string") {
            res.statusCode = 400;
            return res.json({ message: "Invalid username" });
        }

        // TODO: Implement password policy
        // min 8 characters
        // 1 capital, 1 special

        const hash_pass = await bcrypt.hash(password, 10);

        try {
            await UserModel.createUser(
                user_name,
                first_name,
                last_name,
                contact_no,
                email,
                hash_pass,
                sec_ques,
                sec_ans
            );
            res.statusCode = 201;
            return res.json({
                message: "User Created Successfully!",
            });
        } catch (err) {
            if (err.code == 11000) {
                //duplicate username found
                res.statusCode = 409;
                return res.json({ message: err.message });
            }
            res.statusCode = 500;
            return res.json({ status: "Unknown server error" });
        }
    }

    static async loginUser(req, res) {
        if (req.body === undefined || typeof req.body === undefined) {
            res.statusCode = 400;
            return res.json({ message: "No body provided" });
        }

        const { user_name, password } = req.body;

        if (!user_name || typeof user_name !== "string") {
            res.statusCode = 400;
            return res.json({ message: "Invalid username" });
        }

        try {
            const user = await UserModel.getUserByUsername(user_name);
            if (user == null) {
                res.statusCode = 401;
                return res.json({
                    message: "User not found!",
                });
            }

            const pass_match = await bcrypt.compare(password, user.password.S);

            if (!pass_match) {
                res.statusCode = 401;
                return res.json({
                    message: "Invalid Password",
                });
            }

            const authToken = JWTHelp.createAuthToken(user.userId);
            const refreshToken = JWTHelp.createRefreshToken(user.userId);

            res.statusCode = 200;
            return res.json({
                authToken: authToken,
                refreshToken: refreshToken,
            });
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({ status: "Unknown server error" });
        }
    }

}

module.exports = Auth_Controller;
