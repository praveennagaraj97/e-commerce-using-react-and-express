import { verifyJWToken } from "../../utils/jsonWebToken";

export default async (req, context) => {
  const output = { error: null, user: null };

  if (!req.headers.authorization)
    return { ...output, error: "Please Login First" };

  if (req.headers.authorization) {
    if (!req.headers.authorization.startsWith("Bearer")) {
      return { ...output, error: "Bearer token Not Found" };
    }
  }

  const auth_token = req.headers.authorization.split("Bearer ")[1];
  const tokenDetails = await verifyJWToken(auth_token);
  const user = await context.findById(tokenDetails.id);
  // if user account is deleted
  if (!user) return { ...output, error: "Authentication Error Invalid Token" };

  return { ...output, user };
};
