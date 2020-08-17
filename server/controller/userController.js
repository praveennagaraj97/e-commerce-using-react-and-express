import { User } from "../model/UserModel";
import { signUpHandler, signInHandler } from "../handlers/userHandler";
export { protectForReact } from "../handlers/userHandler";
export { accreditReact } from "../middleware/accreditReact";

export const signUp = signUpHandler(User, {
  message: "Signed Up Successfully",
});

export const signIn = signInHandler(User, {
  message: "Signed In Successfully",
});
