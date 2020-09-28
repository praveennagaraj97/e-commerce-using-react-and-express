import React from "react";

import "../../styles/home.scss";
import BlogAboutProduct from "./BlogAboutProducts";
import LevelOneAds from "./LevelOneAds";
import RecentSearchedItems from "./RecentSearchedItems";

const HomePage = () => {
  return (
    <>
      <h1 className='home-page-lexa-tagline'>
        <span className='a1'>Everything you love,</span>
        <span className='a2'>is online.</span>
      </h1>

      {/* First-level-ads cost-level-1 Sigle Image */}
      <LevelOneAds />

      {/* Recent searched items /last 4 */}
      <RecentSearchedItems />

      {/* Blog posts by lexa-team */}
      <BlogAboutProduct />
    </>
  );
};

export default HomePage;
