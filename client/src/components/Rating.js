import React from "react";
import Rating from "@material-ui/lab/Rating";

export const ShowRating = ({ value }) => {
  return (
    <Rating
      name='simple-controlled'
      precision={0.5}
      readOnly={true}
      value={value}
      //   onChange={(event, newValue) => {
      //     setValue(newValue);
      //   }}
    />
  );
};
