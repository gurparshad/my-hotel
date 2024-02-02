import React from "react";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({src, alt}) => {
  return <img src={src} alt={alt} />;
};

export default LazyImage;
