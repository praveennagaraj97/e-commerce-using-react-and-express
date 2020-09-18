import catchAsyncError from "../utils/catchAsyncError";

export const preFillUserId = (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};

// Needs fix
export const getAllProductsWithAverageReviewAttached = catchAsyncError(
  async (req, res, next) => {
    res.status(200).json({
      resultsFound: req.details.length,
      message: req.message,
      details: req.details,
    });
  }
);
