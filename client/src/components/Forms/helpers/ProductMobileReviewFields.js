import React, { Fragment, useEffect, useState } from "react";

import { ShowRating } from "../../Rating";

export const ProductMobileReviewFields = ({ setValue }) => {
  const [faceRecognition, setFaceRecognition] = useState(5);
  const [cameraQuality, setCameraQuality] = useState(5);
  const [pictureQuality, setPictureQuality] = useState(5);
  const [screenQuality, setScreenQuality] = useState(5);
  const [soundQuality, setSoundQuality] = useState(5);
  const [batteryLife, setBatteryLife] = useState(5);
  const [valueForMoney, setValueForMoney] = useState(5);

  useEffect(() => {
    const mobileReviewValues = {
      faceRecognition,
      cameraQuality,
      pictureQuality,
      screenQuality,
      soundQuality,
      batteryLife,
      valueForMoney,
    };

    setValue(mobileReviewValues);
  }, [
    faceRecognition,
    cameraQuality,
    pictureQuality,
    screenQuality,
    soundQuality,
    batteryLife,
    valueForMoney,
    setValue,
  ]);

  const mobileReviewFields = [
    {
      title: "Face Recognition",
      value: faceRecognition,
      setter: setFaceRecognition,
      eleName: "face-recognition",
    },
    {
      title: "Camera Quality",
      value: cameraQuality,
      setter: setCameraQuality,
      eleName: "cam-quality",
    },
    {
      title: "Picture Quality",
      value: pictureQuality,
      setter: setPictureQuality,
      eleName: "pic-quality",
    },
    {
      title: "Screen Quality",
      value: screenQuality,
      setter: setScreenQuality,
      eleName: "scr-quality",
    },
    {
      title: "Sound Quality",
      value: soundQuality,
      setter: setSoundQuality,
      eleName: "sound-quality",
    },
    {
      title: "Battery Life ",
      value: batteryLife,
      setter: setBatteryLife,
      eleName: "btr-life",
    },
    {
      title: "Value For Money",
      value: valueForMoney,
      setter: setValueForMoney,
      eleName: "val-for-money",
    },
  ];

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
