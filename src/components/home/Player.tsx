import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/styles/audioplayer.css";
import { useSelector } from "react-redux";
import { PlayerState } from "@/store/player/slice";
import { Song } from "@/types/song.types";
import { useEffect } from "react";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";

const SongItemCmpnt = ({ song }: { song: Song }) => {
  return (
    <>
      <div className="flex space-x-5 max-h-28">
        {/* <div className="h-28 w-28 "> */}
        <img
          src={song.image || "dfdsafasd"}
          alt={song.title}
          className="hidden object-cover object-center h-28 w-28 sm:block"
        />

        <div className="w-full pt-4 grow md:space-y-2">
          <h4 className="text-base font-bold">{song.title}</h4>
          <p className="mt-1 text-sm italic font-semibold text-gray-500 ">
            {song.artist_name}
          </p>
        </div>
      </div>
    </>
  );
};

export default function Player() {
  const playerStore = useSelector(
    (state: { player: PlayerState }) => state.player
  );

  useEffect(() => {
    async function increaseView() {
      try {
        if (playerStore.song) {
          const resp = await AxiosApi.instance.post(ApiUrls.increaseSongView, {
            song_id: playerStore.song.id,
          });
          console.log("increase-view response:", resp);
        }
      } catch (error) {
        console.log(error);
      }
    }
    increaseView();
  }, [playerStore]);

  return (
    <div className="fixed bottom-0 w-full ">
      {playerStore && playerStore.song && (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex border-t border-gray-300">
            <div className="w-full pt-5 bg-white">
              <AudioPlayer
                src={playerStore.song.audio}
                volume={0.5}
                autoPlay={true}
              />
            </div>

            <div className="bg-gray-100 min-w-[20rem] max-w-[100rem] hidden sm:block">
              <SongItemCmpnt song={playerStore.song}></SongItemCmpnt>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
