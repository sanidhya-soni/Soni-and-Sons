const JWT = require("jsonwebtoken");
// const UserModel = require("../models/User_Model");

const createAuthToken = (userID) => {
  return JWT.sign({ UserID: userID }, process.env.AUTH_SECRET_KEY, {
    expiresIn: "30m",
  });
};

const createRefreshToken = (userID) => {
  return JWT.sign({ UserID: userID }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const verifyRefreshToken = (token) => {
  let verify = JWT.verify(
    token,
    process.env.REFRESH_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        throw err;
      }
      return decoded;
    }
  );
  return verify;
};

const verifyAuthToken = (token) => {
  let verify = JWT.verify(
    token,
    process.env.AUTH_SECRET_KEY,
    function (err, decoded) {
      if (err) {
        throw err;
      }
      return decoded;
    }
  );
  return verify;
};

//Utility Step to verify authorization
const checkToken = async (req, res, next) => {
  try {
    //Getting the Auth Token from Header
    let token = req.headers.authtoken;

    //Checking If token is provided or not
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    //Decoding the token to get the respective User ID
    const decoded = verifyAuthToken(token);

    //Storing the User ID in request
    req.userID = decoded.UserID;

    //If Auth Token is successfully verified, we go towards the next step
    next();
  } catch (err) {
    //If the token provided is wrong then "Invalid Token" message is sent
    if (err.message == "invalid signature") {
      return res.status(401).json({ mesage: "Invalid Token" });
    }
    res.send(err);
  }
};

// const checkAdmin = async (req, res, next) => {
//   try {
//     //Getting the Auth Token from Header
//     let token = req.headers.authtoken;

//     //Checking If token is provided or not
//     if (!token) {
//       return res.status(400).json({ message: "Token not provided" });
//     }

//     //Decoding the token to get the respective User ID
//     const decoded = verifyAuthToken(token);

//     //Fetching User
//     const user = await UserModel.findOne({ _id: decoded.UserID });

//     if (!user.isAdmin) {
//       return res.status(403).json({ message: "You are not an admin" });
//     }

//     //Storing the User ID in request
//     req.userID = decoded.UserID;

//     //If Auth Token is successfully verified, we go towards the next step
//     next();
//   } catch (err) {
//     //If the token provided is wrong then "Invalid Token" message is sent
//     if (err.message == "invalid signature") {
//       return res.status(401).json({ mesage: "Invalid Token" });
//     }
//     res.send(err);
//   }
// };

module.exports = {
  createAuthToken,
  createRefreshToken,
  verifyAuthToken,
  verifyRefreshToken,
  checkToken,
};
