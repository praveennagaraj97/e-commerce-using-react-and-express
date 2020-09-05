import React, { useRef, useState, useEffect } from "react";

import "../styles/videoPlayer.scss";

const VideoPlayer = ({ src }) => {
  const [element, setElement] = useState(null);
  const [volume, setVolume] = useState(true);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const video = document.getElementById("videoPlayer");
          video.play();
        } else {
          const video = document.getElementById("videoPlayer");
          video.pause();
        }
      },
      { threshold: 0.6 }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  if (src)
    return (
      <div className='video-player-container'>
        <img
          className='tap-for-volume-notifier'
          src={
            volume
              ? "https://img.icons8.com/clouds/50/000000/no-audio.png"
              : "https://img.icons8.com/bubbles/50/000000/high-volume.png"
          }
        />
        <video
          ref={setElement}
          onClick={() => setVolume(!volume)}
          id='videoPlayer'
          muted={volume}
          src={src}
        />
      </div>
    );
  return <></>;
};

export default VideoPlayer;
