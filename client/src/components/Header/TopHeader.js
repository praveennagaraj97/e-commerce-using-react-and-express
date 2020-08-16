import React, { useEffect, Fragment } from "react";

import "../../styles/topHeader.scss";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const TopHeader = (props) => {
  useEffect(() => {});

  return (
    <Fragment>
      <div className='top-header-bar'>
        <div className='top-header__logo animate__fadeInRight'>Lexa</div>
        <div className='top-header__musicPlayer'>
          <MusicPlayer windowWidth={props.windowWidth} />
        </div>
      </div>
    </Fragment>
  );
};

export default TopHeader;
