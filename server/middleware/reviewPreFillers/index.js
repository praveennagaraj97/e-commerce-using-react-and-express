import catchAsyncError from "../../utils/catchAsyncError";

export const preFillReviewFoundHelpFul = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (req.params.bool === "true") {
      req.body.helpul = req.params.bool;
      next();
    } else {
      // find the doc and remove it!
      await ModelName.findOneAndDelete({ userId: req.user._id });
      res.status(200).json({
        message: responseMessage.message,
      });
    }
  });
