import React from "react";

import "../../styles/home.scss";

const HomePage = () => {
  return (
    <>
      <div className='home-page-container'>
        <div className='t1'>Welcome ,</div>
        <div className='t2'>To Lexa Community</div>
        <div className='t3'>Login to Start.</div>
      </div>
      <div className='notify-for-other'>
        Note : This is only for our community members!
      </div>
    </>
  );
};

export default HomePage;
