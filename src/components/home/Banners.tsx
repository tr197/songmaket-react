import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import css

const Banners: React.FC = () => {
  const onChange = () => {};
  const onClickItem = () => {};

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      transitionTime={1000}
      interval={6000}
    >
      <div>
        <img
          src="/images/banners/b1.png"
          alt="Item 1"
          className="object-cover aspect-[1280/564]"
        />
      </div>
      <div>
        <img
          src="/images/banners/b2.png"
          alt="Item 2"
          className="object-cover aspect-[1280/564]"
        />
      </div>
      <div>
        <img
          src="/images/banners/b3.png"
          alt="Item 3"
          className="object-cover aspect-[1280/564]"
        />
      </div>
    </Carousel>
  );
};

export default Banners;
