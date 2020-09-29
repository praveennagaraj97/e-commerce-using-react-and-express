import React, { memo, useEffect, useState } from "react";

import { getTopLevelAdvertiseEndpoint } from "../../api";
import { loadViewProductDetail, loadTopAdvertiseLoading } from "../../actions";

import "../../styles/advertise.scss";
import { useDispatch } from "react-redux";

const LevelOneAds = () => {
  const dispatcher = useDispatch();
  const [adData, setAdData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        dispatcher(loadTopAdvertiseLoading(true));
        const { data } = await getTopLevelAdvertiseEndpoint();

        dispatcher(loadTopAdvertiseLoading(false));

        setAdData(data.details[0]);
      } catch (err) {
        dispatcher(loadTopAdvertiseLoading(false));
        console.clear();
      }
    })();
  }, [dispatcher]);

  const handleViewAdvertiseDetail = () => {
    const modelledView = {
      category: adData.productId.categoryId.categoryName.toLowerCase(),
      id: adData.productId._id,
    };
    dispatcher(loadViewProductDetail(modelledView));
  };

  if (!adData) return null;

  return (
    <div
      onClick={handleViewAdvertiseDetail}
      className='advertisement-top-level__container'>
      <img src={adData.advertiseBoard} alt='advertiseBoard' />
      <p>
        Shop now <span>{">"}</span>
      </p>
    </div>
  );
};

export default memo(LevelOneAds);
