import Navbar from "@/components/nav/Navbar";
import BannersCmpnt from "@/components/home/BannersCmpnt";
import SongsGroup from "@/components/home/SongsGroup";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import Player from "@/components/home/Player";
import { fetchHomeData, SongsState } from "@/store/songs/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const listSongs = useSelector((state: { songs: SongsState }) => state.songs);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[59rem]">
        <div className="pb-4 sm:pb-10">
          <BannersCmpnt banners={listSongs.banners} />
        </div>
        {listSongs && (
          <div>
            <SongsGroup
              songs={listSongs.new_songs}
              total={listSongs.total}
              sectionChoice="new"
            />
            <SongsGroup
              songs={listSongs.top_songs}
              total={listSongs.total}
              sectionChoice="top"
            />
          </div>
        )}
      </div>
      <Player />
      <Footer />
    </>
  );
}

export default HomePage;
