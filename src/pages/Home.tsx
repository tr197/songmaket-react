import Navbar from "@/components/nav/Navbar";
import Banners from "@/components/home/Banners";
import SongsGroup from "@/components/home/SongsGroup";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import AxiosApi from "@/services/api/AxiosApi";
import { Song } from "@/types/song.types";
import Player from "@/components/home/Player";

type ListHomeSong = {
  new_songs: Song[];
  top_songs: Song[];
};

function HomePage() {
  const [listSongs, setListSongs] = useState<ListHomeSong | null>(null);

  useEffect(() => {
    async function getHomeSongs() {
      try {
        const resp = await AxiosApi.instance.get<ListHomeSong>("/api/home/");
        console.log("resp:", resp);
        setListSongs(resp.data);
      } catch (err) {
        console.log(err);
      }
    }
    getHomeSongs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[59rem]">
        <div className="pb-4 sm:pb-10">
          <Banners />
        </div>
        {listSongs && <SongsGroup songs={listSongs.new_songs} />}
      </div>
      <Player />
      <Footer />
    </>
  );
}

export default HomePage;
