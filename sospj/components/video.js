// VideoPlayer.js
import React from 'react';
import Video from 'react-native-video';

const VideoPlayer = ({ source, style, onEnd }) => {
  return <Video source={source} resizeMode='cover' style={style} onEnd={onEnd} />;
};

export default VideoPlayer;
