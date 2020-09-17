import React from "react";
import Rating from "@material-ui/lab/Rating";

export const ShowRating = ({ value }) => {
  return (
    <Rating
      name='simple-controlled'
      value={parseInt(value, 10)}
      //   onChange={(event, newValue) => {
      //     setValue(newValue);
      //   }}
      disabled
    />
  );
};
