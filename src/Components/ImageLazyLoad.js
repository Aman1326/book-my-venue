import React, { useRef, useEffect, useState } from "react";
import "../Components/Css/ImageLazyLoad.css";
const ImageLazyLoad = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When image intersects with viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imageRef.current); // Stop observing once visible
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // 10% of the image must be visible
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Start observing the image
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Clean up
      }
    };
  }, [src]);

  return (
    <div className="image-container">
      {isVisible ? (
        <img ref={imageRef} src={src} alt={alt} />
      ) : (
        <div className="placeholder"></div> // Placeholder for blur loading
      )}
    </div>
  );
};

export default ImageLazyLoad;
