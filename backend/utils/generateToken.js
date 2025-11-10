import jwt from "jsonwebtoken";
import { JWT_User_Secret } from "../../config.js";

export default function generateToken(id) {
  const token = jwt.sign(
    {
      id: id,
    },
    JWT_User_Secret,
    { expiresIn: "30d" } // Optionally add an expiration for the token
  );

  return token;
}
