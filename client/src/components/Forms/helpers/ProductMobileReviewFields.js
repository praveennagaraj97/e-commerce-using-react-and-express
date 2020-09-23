import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { change } from "redux-form";

import { ShowRating } from "../../Rating";

export const ProductMobileReviewFields = () => {
  const [faceRecognition, setFaceRecognition] = useState(5);
  const [cameraQuality, setCameraQuality] = useState(5);
  const [pictureQuality, setPictureQuality] = useState(5);
  const [screenQuality, setScreenQuality] = useState(5);
  const [soundQuality, setSoundQuality] = useState(5);
  const [batteryLife, setBatteryLife] = useState(5);
  const [valueForMoney, setValueForMoney] = useState(5);

  const dispatch = useDispatch();

  const mobileReviewFields = [
    {
      title: "Face Recognition",
      value: faceRecognition,
      setter: setFaceRecognition,
      eleName: "faceRecognition",
    },
    {
      title: "Camera Quality",
      value: cameraQuality,
      setter: setCameraQuality,
      eleName: "cameraQuality",
    },
    {
      title: "Picture Quality",
      value: pictureQuality,
      setter: setPictureQuality,
      eleName: "pictureQuality",
    },
    {
      title: "Screen Quality",
      value: screenQuality,
      setter: setScreenQuality,
      eleName: "screenQuality",
    },
    {
      title: "Sound Quality",
      value: soundQuality,
      setter: setSoundQuality,
      eleName: "soundQuality",
    },
    {
      title: "Battery Life ",
      value: batteryLife,
      setter: setBatteryLife,
      eleName: "batteryLife",
    },
    {
      title: "Value For Money",
      value: valueForMoney,
      setter: setValueForMoney,
      eleName: "valueForMoney",
    },
  ];
  useEffect(() => {
    mobileReviewFields.forEach(({ eleName, value }) => {
      dispatch(change("productMobileReview", eleName, value));
    });
  }, [dispatch, mobileReviewFields]);

  return (
    <Fragment>
      {mobileReviewFields.map(({ title, value, setter, eleName }, index) => {
        return (
          <div key={index} className='product-review-input__box'>
            <p>{title}</p>
            <ShowRating
              value={value}
              name={eleName}
              input={true}
              getValue={(value) => {
                setter(value);
              }}
            />
          </div>
        );
      })}
    </Fragment>
  );
};
