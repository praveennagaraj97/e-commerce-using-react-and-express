import React, { useRef, useState, useEffect } from "react";

import "../styles/videoPlayer.scss";

const VideoPlayer = ({ src }) => {
  const [element, setElement] = useState(null);

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
        <video ref={setElement} id='videoPlayer' src={src} />
      </div>
    );
  return <></>;
};

export default VideoPlayer;
