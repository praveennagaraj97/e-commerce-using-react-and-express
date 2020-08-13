import { User } from "../model/UserModel";
import { signUpHandler } from "../handlers/userHandler";

export const signUp = signUpHandler(User, {
  message: "Signed Up Successfully",
});
