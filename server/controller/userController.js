import { User, SellerModel } from "../model/UserModel";
import {
  // User
  signUpHandler,
  signInHandler,
  updateUserDetails,
  forgotPasswordHandler,

  // Seller
  createSellerAccount,

  // middleware
  protectRoute,
  protectForReact as protect,
  resetPasswordHandler,
} from "../handlers/userHandler";

export { accreditReact } from "../middleware/accreditReact";

export const protectRoutes = protectRoute(User);
export const protectForReact = protect(User);

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
