import React from 'react';

const RotatedImg = (props) => {
  const {src, degree, size, top, left, ...rest} = props;

  const img = new Image();
  img.src = src;
  const width  = img.width;
  const height = img.height;

  return (
    <img
      {...rest}
      src={src}
      style={{
        transform: `rotate(${degree}deg)`,
        position: 'absolute',
        top: top - height * size / 2,
        left: left - width * size / 2,
        width: width * size,
        height: height * size,
      }}
      alt='alt'
    />
  )
};

export default RotatedImg;