import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Banner } from "@/types/song.types";

const BannersCmpnt = ({ banners }: { banners: Banner[] }) => {
  const onChange = () => {};
  const onClickItem = () => {};

  return (
    <div>
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
        {banners.map((item) => (
          <div key={item.image}>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover aspect-[1280/564]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannersCmpnt;
