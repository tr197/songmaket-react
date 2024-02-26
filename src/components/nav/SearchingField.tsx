import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";
import { Song } from "@/types/song.types";
import { DEFAULT_SONG_IMAGE } from "@/constants/constants";
import { useDispatch } from "react-redux";
import { setSongPlayer } from "@/store/player/slice";

interface Artist {
  id: string;
  name: string;
}

interface SearchingResponse {
  artists_matches: Artist[];
  songs_matches: Song[];
}

const SearchResultSongs = ({ songs }: { songs: Song[] }) => {
  const dispatch = useDispatch();
  const playSong = (song: Song) => {
    dispatch(setSongPlayer(song));
  };

  return (
    <ul className="">
      {songs.map((song) => (
        <li
          key={song.id}
          className="px-2 py-2 my-2 border-b border-gray-300 rounded-sm hover:bg-gray-200"
        >
          <button onClick={() => playSong(song)} className="flex space-x-2">
            <img
              src={song.image || DEFAULT_SONG_IMAGE}
              alt=""
              className="w-10 h-10 rounded-sm md:w-14 md:h-14"
            />
            <div>
              <p className="text-sm font-semibold text-gray-600 md:text-base">
                {song.title}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default function SearchingField() {
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchList, setShowSearchList] = useState<boolean>(false);

  const [songResultItems, setSongResultItem] = useState<Song[]>([]);

  useEffect(() => {
    async function callSearchApi() {
      if (!searchText) {
        return;
      }
      try {
        const resp = await AxiosApi.instance.get<SearchingResponse>(
          ApiUrls.searching,
          {
            params: {
              search_text: searchText,
            },
          }
        );

        setSongResultItem(resp.data.songs_matches);

        console.log(searchText, resp);
      } catch (error) {
        console.log("searching error:", error);
      }
    }

    callSearchApi();
  }, [searchText]);

  useEffect(() => {
    if (songResultItems.length > 0) {
      setShowSearchList(true);
    } else {
      setShowSearchList(false);
    }
  }, [songResultItems]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowSearchList(false);
      }}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="flex">
          <div className="relative max-w-96 grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </div>

            {/* input search */}
            <input
              id="search"
              name="search"
              className="rounded-full h-12 block w-full border-0 py-1.5 pl-9 sm:pl-12 pr-3 text-gray-800  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 focus:outline-none sm:text-sm sm:leading-6"
              placeholder="Typing any name here.."
              type="search"
              value={searchText || ""}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* search result */}
            {showSearchList && (
              <div className="z-50 absolute bg-gray-50 border-x border-b border-gray-300 shadow-xl w-full max-h-[42rem] md:max-h-[52rem] overflow-y-auto py-2 px-3 sm:px-5 mt-2 rounded-xl">
                <SearchResultSongs songs={songResultItems} />
              </div>
            )}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
}
