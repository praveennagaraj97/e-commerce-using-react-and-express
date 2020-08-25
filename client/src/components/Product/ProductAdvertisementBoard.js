import React, { useEffect } from "react";

import "../../styles/productAdvertisement.scss";

const ProductAdvertisementBoard = () => {
  const advertisement = "";

  useEffect(() => {
    // axios
    //   .get("http://localhost:3002/advertisement")
    //   .then((response) => {
    //     setAdvertisement(response.data.wallImage);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <div className='advertisement'>
      {advertisement ? <img src={advertisement} alt='adverstisement' /> : ""}
    </div>
  );
};

export default ProductAdvertisementBoard;
