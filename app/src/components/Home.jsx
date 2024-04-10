import { CiSearch } from "react-icons/ci";
import TopSongs from "./TopSongs";
import { Axios } from "../../config";
import { useState } from "react";
import { toast } from "react-toastify";
import SearchResult from "./SearchResult";
import AlbumSearchResults from "./AlbumSearchResults";

const Home = () => {
  const [artistQuery, setArtistQuery] = useState("");
  const [albumQuery, setAlbumQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleArtistSearch = async () => {
    try {
      const response = await Axios.get(`/search?q=${encodeURIComponent(artistQuery)}`);
      const { results } = response.data;
      const resultsArray = Object.values(results);

      setSearchResults(resultsArray);
    } catch (error) {
      console.error("An error occurred during artist search:", error);
      toast.error("An error occurred during artist search");
    }
  };

  const handleAlbumSearch = async () => {
    try {
      const response = await Axios.get(`/search-a?q=${encodeURIComponent(albumQuery)}`);
      const { results } = response.data;
      const resultsArray = Object.values(results);

      setSearchResults(resultsArray);
    } catch (error) {
      console.error("An error occurred during album search:", error);
      toast.error("An error occurred during album search");
    }
  };

  const handleArtistInputChange = (event) => {
    const value = event.target.value;
    setArtistQuery(value);
  };

  const handleAlbumInputChange = (event) => {
    const value = event.target.value;
    setAlbumQuery(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (artistQuery !== "") {
        handleArtistSearch();
      }
      if (albumQuery !== "") {
        handleAlbumSearch();
      }
    }
  };

  return (
    <>
      <div className="mt-24 w-full bg-white dark:bg-gray-900 md:px-32 px-5">
        <div className="search-section flex justify-between gap-5 w-full  py-5">
          <div className="flex w-full">
            <span className="inline-flex items-center px-3 text-sm text-blue-900 bg-blue-200 border border-e-0 border-blue-300 rounded-s-md  ">
              <CiSearch className="text-xl" />
            </span>
            <input
              type="search"
              id="search-artist"
              className="rounded-none rounded-e-lg bg-blue-700/15 border border-blue-300 text-blue-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
              placeholder="Search Artist"
              value={artistQuery}
              onChange={handleArtistInputChange}
              onKeyPress={handleKeyPress}
              disabled={albumQuery !== ""}
            />
          </div>

          <div className="flex w-full">
            <span className="inline-flex items-center px-3 text-sm text-blue-900 bg-blue-200 border border-e-0 border-blue-300 rounded-s-md  ">
              <CiSearch className="text-xl" />
            </span>
            <input
              type="search"
              id="search-album"
              className="rounded-none rounded-e-lg bg-blue-700/15 border border-blue-300 text-blue-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
              placeholder="Search Albums"
              value={albumQuery}
              onChange={handleAlbumInputChange}
              onKeyPress={handleKeyPress}
              disabled={artistQuery !== ""}
            />
          </div>
        </div>

        <div className="pt-5">
          {searchResults.length > 0 ? (
            <>
              {artistQuery !== "" && <SearchResult results={searchResults} key="search-results" />}
              {albumQuery !== "" && <AlbumSearchResults results={searchResults} key="album-search-results" />}
            </>
          ) : (
            <TopSongs key="top-songs" />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;