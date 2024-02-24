import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { classNames } from "@/utils/ui-suport";

const songItems = [
  {
    id: 1,
    name: "How you like that",
    singer: "Mint",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg",
    imageAlt: "Front side of mint cotton t-shirt with wavey lines pattern.",
  },
  {
    id: 2,
    name: "Pink vernom",
    singer: "Charcoal",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front side of charcoal cotton t-shirt.",
  },
  {
    id: 2,
    name: "Batter up",
    singer: "Charcoal",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front side of charcoal cotton t-shirt.",
  },
];

const SongItemCmpnt = ({ song }: { song: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <>
      <div
        key={song.id}
        className="flex py-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex-shrink-0 border-2 hover:border-green-400 hover:border-2 rounded-xl">
          <img
            src={song.imageSrc}
            alt={song.imageAlt}
            className="object-cover object-center w-24 h-24 rounded-xl sm:h-32 sm:w-32"
          />
        </div>

        <div className="flex flex-col flex-1 ml-4 sm:ml-6">
          <div>
            <div>
              <h4 className="text-xl font-bold">{song.name}</h4>
            </div>
            <p className="mt-1 text-base italic text-gray-500">{song.singer}</p>
          </div>

          <div className="flex items-end flex-1 mt-4">
            <button
              className={classNames(
                isHovered ? "block" : "hidden",
                "flex items-center pt-1 pr-8 space-x-2 text-sm text-gray-200 hover:text-green-500"
              )}
            >
              <InformationCircleIcon
                className="flex-shrink-0 w-6 h-6"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function SongsGroup() {
  return (
    <div>
      <div className="py-3 border-b border-gray-300">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          New Song
        </h2>
      </div>

      <div className="grid grid-cols-1 pr-4 mt-6 sm:pr-10 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
        {songItems.map((song) => (
          <SongItemCmpnt song={song} />
        ))}
      </div>
    </div>
  );
}
