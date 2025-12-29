import jwt from "jsonwebtoken";
import { JWT_User_Secret } from "../config.js";
import userModel from "../models/userModel.js";

async function auth(req, res, next) {
  //const token = req.headers.token;

  //const decodedInfo = jwt.verify(token, JWT_User_Secret);
  //console.log(decodedInfo);
  //   if (decodedInfo) {
  //     req.id = decodedInfo.id;
  //     return next();
  //   } else {
  //     return res.json({
  //       msg: "Incorrect credentials",
  //     });
  //   }
  let token;
  //token structure is Authorization: Bearer <token>
  //console.log("Authorization header:", req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedInfo = jwt.verify(token, JWT_User_Secret);
      //Find the user and assign the user(without password) to req.user
      req.user = await userModel.findById(decodedInfo.id).select("-password");
      return next();
    } catch (err) {
      console.log("Token Verification failed with err: " + err);
      return res.status(401).json({
        msg: "Not authorized.Token failed1",
      });
    }
  }
  return res.status(401).json({
    msg: "Not authorized.Token failed2",
  });
}

export default auth;
