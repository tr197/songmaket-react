import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export default function SearchingField() {
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchList, setShowSearchList] = useState<boolean>(true);

  const searchList = [
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
    { name: "How you like that" },
  ];

  const SearchListView = searchList.map((item) => {
    return (
      <li key={item.name} className="h-20">
        <a>{item.name}</a>
      </li>
    );
  });

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
            {searchList.length > 0 && showSearchList && (
              <div className="z-50 absolute bg-gray-50 border-x border-b border-gray-300 shadow-xl w-full max-h-[42rem] md:max-h-[52rem] overflow-y-auto py-2 px-8 sm:px-11 mt-2 rounded-xl">
                <ul className="pl-0.5"> {SearchListView} </ul>
              </div>
            )}
          </div>
          {/* <button
            className="w-20 h-12 text-sm bg-gray-800 sm:w-28 text-gray-50"
          >
            Search
          </button> */}
        </div>
      </div>
    </OutsideClickHandler>
  );
}
