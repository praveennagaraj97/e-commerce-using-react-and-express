import { User, SellerModel } from "../model/UserModel";
import {
  // User
  signUpHandler,
  signInHandler,
  updateUserDetails,

  // Seller
  createSellerAccount,

  // middleware
  protectRoute,
  protectForReact as protect,
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

// Seller
export const becomeSeller = createSellerAccount(SellerModel, {
  message: "Seller account created Successfully",
});
