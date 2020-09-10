import { User } from "../model/UserModel";
import {
  // User
  signUpHandler,
  signInHandler,
  updateUserDetails,
  forgotPasswordHandler,

  // middleware
  protectRoute as protectRouteHandler,
  resetPasswordHandler,
} from "../handlers/userHandler";

export { accreditReact } from "../middleware/accreditReact";

export const protectRoute = protectRouteHandler(User);

export const signUp = signUpHandler(User, {
  message: "Signed Up Successfully",
});

export const signIn = signInHandler(User, {
  message: "Signed In Successfully",
});

export const updateMe = updateUserDetails(User, {
  message: "User Updated Successfully",
});

export const forgotPassword = forgotPasswordHandler(User, {
  message: "Reset Token Sent to registred mail address.",
});

export const resetPassword = resetPasswordHandler(User, {
  message: "Password changed Successfully",
});

export const getMe = (req, res, next) => {
  res.status(200).json({
    message: "requested user",
    user: req.user,
  });
};
