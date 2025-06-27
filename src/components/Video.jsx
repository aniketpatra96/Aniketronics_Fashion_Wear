import React from 'react'

const Video = ({ src = "", className = "", width = 100, height = 100, autoPlay = false, loop = false, preload = "none" }) => {
  return (
    <video className={className} width={width} height={height} controls autoPlay={autoPlay} preload={preload} loop={loop} >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default Video