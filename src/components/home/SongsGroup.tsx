import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { classNames } from "@/services/utils/ui-suport";
import { Song, SongSectionChoice } from "@/types/song.types";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSongPlayer } from "@/store/player/slice";
import { DEFAULT_SONG_IMAGE, PAGE_SIZE } from "@/constants/constants";
import Loading from "../utils/Loading";
import { ListSong, fetchMoreTopSong } from "@/store/songs/slice";
import { fetchMoreNewSong } from "@/store/songs/slice";
import { AppDispatch } from "@/store/store";

export default function SongsGroup({
  songs,
  sectionChoice,
  total,
}: {
  songs: ListSong;
  sectionChoice: SongSectionChoice;
  total: number;
}) {
  const headerName = useMemo(() => {
    if (sectionChoice === "new") {
      return "New Songs";
    }
    if (sectionChoice === "top") {
      return "Top Favorite Song";
    }
  }, [sectionChoice]);

  const dispatch = useDispatch<AppDispatch>();
  const onClickMoreSong = () => {
    if (songs.data.length === total) {
      return;
    }
    const newNageSong = songs.data.length / PAGE_SIZE + 1;
    if (sectionChoice === "new") {
      dispatch(fetchMoreNewSong(newNageSong));
    } else if (sectionChoice === "top") {
      dispatch(fetchMoreTopSong(newNageSong));
    }
  };

  return (
    <div className="mb-2 sm:mb-6">
      <div className="py-3 border-b border-gray-300">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {headerName}
        </h2>
      </div>

      <div className="pr-4 mt-6 sm:pr-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
          {songs.data.map((song) => (
            <SongItemCmpnt key={song.id} song={song} />
          ))}
        </div>
        <div className="h-12 pl-2">
          {songs.data.length < total && (
            <button
              className="text-xl italic font-bold text-gray-400 hover:text-sky-500"
              onClick={onClickMoreSong}
            >
              See more...
            </button>
          )}
          {songs.status === "loading" && <Loading />}
        </div>
      </div>
    </div>
  );
}

const SongItemCmpnt = ({ song }: { song: Song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredImg, setIsHoveredImg] = useState(false);

  const dispatch = useDispatch();

  const onListenSong = async () => {
    dispatch(setSongPlayer(song));
  };

  return (
    <>
      <div
        className="flex py-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-shrink-0 ">
          <button
            className="relative overflow-hidden bg-no-repeat bg-cover border-2 hover:border-green-400 hover:border-2 rounded-xl"
            onMouseEnter={() => setIsHoveredImg(true)}
            onMouseLeave={() => setIsHoveredImg(false)}
            onClick={onListenSong}
          >
            <img
              src={song.image || DEFAULT_SONG_IMAGE}
              alt={song.title}
              className="object-cover object-center w-28 h-28 md:h-28 md:w-28 rounded-xl sm:h-24 sm:w-24"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.3)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            <div
              className={classNames(
                isHoveredImg ? "block" : "hidden",
                "absolute bottom-0 right-0 items-center p-2 m-1.5 bg-green-300 rounded-full bg-opacity-90"
              )}
            >
              <PlayIcon className="w-8 h-8 text-gray-800" />
            </div>
          </button>
        </div>

        <div className="flex flex-col flex-1 ml-4 sm:ml-6">
          <div className="md:space-y-2">
            <h4 className="text-xl font-bold sm:text-base md:text-xl">
              {song.title}
            </h4>
            <p className="mt-1 text-base italic font-semibold text-gray-500 sm:text-sm md:text-base">
              {song.artist_name}
            </p>
          </div>

          <div className="flex items-end flex-1">
            <button
              className={classNames(
                isHovered ? "block" : "hidden",
                "flex items-center pt-1 pr-8 space-x-2 text-sm text-gray-200 hover:text-green-400"
              )}
            >
              <InformationCircleIcon
                className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
