import { verify, sign } from "jsonwebtoken";
import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, "..", "config", "config.env"),
});

export const generateJWToken = (payload) => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      process.env.JWT_PRIVATE_KEY,
      {
        algorithm: "HS256",
      },
      (err, encoded) => {
        if (err) reject(err);
        resolve(encoded);
      }
    );
  });
};
