import React, { useEffect, useState } from "react";

import "../../styles/productMobileDetail.scss";

import Axios from "axios";

const getMobileDetails = async () => {
  const { data } = await Axios.get("http://localhost:3004/mobileDetail");
  return data;
};

const ProductMobileDetail = () => {
  const [mobileData, setMobileData] = useState([]);
  const [selectedImg, selectImage] = useState(null);
  const [name, setName] = useState("");
  const [brand, setbrand] = useState("");
  const [rating, setRating] = useState("");
  const [ratedBy, setRatedBy] = useState("");
  const [mrp, setMrp] = useState("");
  const [leastPrice, setLeastPrice] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    getMobileDetails().then((data) => {
      setMobileData(data.images);
      selectImage(data.images[0]);
      setName(data.name);
      setbrand(data.brand);
      setRating(data.avgRating);
      setRatedBy(data.ratedBy);
      setMrp(data.mrp);
      setLeastPrice(data.leastPrice);
    });
  }, []);

  return (
    <div className='product-detailed-view__mobiles'>
      <div className='product-detailed-img-detail-buy'>
        <div className='product-detailed-img'>
          <div className='product-detailed-img__list-container'>
            {mobileData.map((each) => {
              return (
                <img
                  onMouseOver={() => selectImage(each)}
                  className='product-detailed-img-images'
                  key={each}
                  src={each}
                  alt={each}
                />
              );
            })}
          </div>
          <div className='product-detailed-img-selected-image-viewer'>
            <img
              className='product-detailed-img-selected-image'
              src={selectedImg}
              alt='n'
            />
          </div>
        </div>

        {/* Details View */}

        <div className='product-detailed-detail'>
          <h3>{name}</h3>
          <a href='/apple'>Visit {brand} Store</a>
          <p>
            Ratings : {rating} {ratedBy} ratings
          </p>
          <hr />
          <p style={{ color: "grey", textDecoration: "line-through" }}>
            M.R.P ₹{mrp}
          </p>
          <p style={{ color: "coral" }}>Price ₹{leastPrice}</p>
          <p>You Save: ₹{mrp - leastPrice} </p>
          <p>Inclusive of all taxes</p>
          <p>Will be Deleveried by {2} days</p>
          <p style={{ color: "green" }}>In stock.</p>
          <p>Quantity Available : {10}</p>
          <p>SizeName : {64}GB</p>
          <div style={{ display: "flex" }}>
            <button>64Gb</button>
            <button>128GB</button>
            <button>256GB</button>
          </div>
          <button onClick={() => setShow(!show)}>View Details</button>
          {show ? (
            <ul>
              <li>6.1-inch (15.5 cm) Liquid Retina HD LCD display</li>
              <li>
                Water and dust resistant (2 meters for up to 30 minutes, IP68)
              </li>
              <li>
                Dual-camera system with 12MP Ultra Wide and Wide cameras; Night
                mode, Portrait mode, and 4K video up to 60fps
              </li>
              <li>
                12MP TrueDepth front camera with Portrait mode, 4K video, and
                Slo-Motion
              </li>
              <li>Face ID for secure authentication and Apple Pay</li>
              <li>A13 Bionic chip with third-generation Neural Engine</li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className='product-detailed-buy'>
          <h1>Payment</h1>
        </div>
      </div>

      {/* Any Product specified Boards */}
      <div
        style={{ margin: "10px", backgroundColor: "white" }}
        className='product-based-boards'>
        <img
          width='100%'
          src='https://m.media-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/RiverImages/IN_iPhone11_Desktop_01._CB437087859_.jpg'
          alt='dwa'
        />

        <img
          width='100%'
          src='https://m.media-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/RiverImages/IN_iPhone11_Desktop_02._CB437087859_.jpg'
          alt='dwa'
        />

        <img
          width='100%'
          src='https://m.media-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/RiverImages/IN_iPhone11_Desktop_03._CB437087859_.jpg'
          alt='dafw'
        />

        <img
          width='100%'
          src='https://m.media-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/RiverImages/IN_iPhone11_Desktop_04._CB437087858_.jpg'
          alt='dwad'
        />

        <img
          width='100%'
          src='https://m.media-amazon.com/images/G/31/img19/Wireless/Apple/iPhone11/RiverImages/IN_iPhone11_Desktop_05._CB437087858_.jpg'
          alt='dwad'
        />
      </div>
    </div>
  );
};

export default ProductMobileDetail;
