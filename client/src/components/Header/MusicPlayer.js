import React, { Fragment, useState, useRef } from "react";

import "../../styles/musicPlayerAtHeader.scss";
import LinearBuffer from "./LinearBuffer";

const MusicPlayer = (props) => {
  const { windowWidth } = props;
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  const onPlayButtonClick = () => {
    return (
      <audio onEnded={() => setPlaying(false)} id='song'>
        <source
          src='https://res.cloudinary.com/praveennagaraj97/video/upload/v1597232142/Britney-Spears-Baby-One-More-Time_u6hfvv.mp3'
          type='audio/mpeg'></source>
      </audio>
    );
  };

  const musicPlayStatus = () => {
    audioRef.current = document.getElementById("song");
    setPlaying(!playing);
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  return (
    <div className='music-player-box'>
      {onPlayButtonClick()}
      <div className='music-player__control'>
        <div className='music-player-control_buttons'>
          <img
            className='music-player__control-Btn'
            src='https://img.icons8.com/bubbles/50/000000/circled-chevron-left.png'
            alt='Prev'
            height='48px'
          />
          <img
            onClick={musicPlayStatus}
            className='music-player__control-Btn'
            src={
              playing
                ? "https://img.icons8.com/bubbles/50/000000/pause.png"
                : "https://img.icons8.com/bubbles/2x/play.png"
            }
            height='45px'
            alt='Play'
          />

          <img
            className='music-player__control-Btn'
            src='https://img.icons8.com/bubbles/50/000000/circled-chevron-right.png'
            height='48px'
            alt='Next'
          />
        </div>
        {windowWidth > 900 ? (
          <Fragment>
            <div className='music-player__currentTrack'>
              {"Under Development"}
            </div>

            <LinearBuffer />
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
