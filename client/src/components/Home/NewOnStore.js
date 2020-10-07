import React, { useEffect, useState } from "react";

import { getLatestProductsOnStore } from "../../api";
import { loadViewProductDetail } from "../../actions";
import { useDispatch } from "react-redux";

const NewOnStore = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { details },
        } = await getLatestProductsOnStore();

        setLatestProducts(details);
      } catch (err) {
        console.clear();
      }
    })();
  }, []);

  const handleViewProduct = (id, category) => {
    const productModelled = {
      category,
      id,
    };

    dispatch(loadViewProductDetail(productModelled));
  };

  if (!latestProducts.length) return null;

  return (
    <div className='latest-products-on-store'>
      <div>Latest Products On Store</div>
      <div className='new-on-store'>
        {latestProducts.map(
          ({ _id, productCoverImage, categoryId: { categoryName } }) => {
            return (
              <img
                onClick={() =>
                  handleViewProduct(_id, categoryName.toLowerCase())
                }
                src={productCoverImage}
                alt='latest-prod'
                key={_id}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default NewOnStore;
