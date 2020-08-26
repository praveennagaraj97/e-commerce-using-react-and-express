// Don't Edit This File
// This is Exclusive for React App Only.

export const accreditReact = (req, res, next) => {
  if (!req.verified) {
    return res.status(200).json({
      message: "Auth Token Not Found",
    });
  }

  res.status(200).json({
    message: "User is Authorized",
    user: req.user._id,
  });
};
