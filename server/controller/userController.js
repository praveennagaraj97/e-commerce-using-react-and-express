import { User } from "../model/UserModel";
import {
  // middleware
  protectRoute as protectRouteHandler,

  // User
  signUpHandler,
  signInHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  changeUserPasswordHandler,
  updateUserDetails,
} from "../handlers/userHandler";

export { accreditReact } from "../middleware/accreditReact";

export const protectRoute = protectRouteHandler(User);

export const signUp = signUpHandler(User, {
  message: "Signed Up Successfully",
});

export const signIn = signInHandler(User, {
  message: "Signed In Successfully",
});

export const forgotPassword = forgotPasswordHandler(User, {
  message: "Reset Token Sent to registred mail address.",
});

export const resetPassword = resetPasswordHandler(User, {
  message: "Password reset Successfully",
});

export const getMe = (req, res, next) => {
  res.status(200).json({
    message: "requested user",
    user: req.user,
  });
};

export const changeUserPassword = changeUserPasswordHandler(User, {
  message: "Password Changed Successfully",
});

export const updateMe = updateUserDetails(User, {
  message: "User Details Updated",
});
