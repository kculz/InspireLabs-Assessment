import { CiSearch } from "react-icons/ci";
import TopSongs from "./TopSongs";
import TopAlbums from "./TopAlbums";
import { Axios } from "../../config";
import { useState } from "react";
import SearchResult from "./SearchResult";

const Home = () => {
   
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
          const response = await Axios.get(
            `/search?q=${encodeURIComponent(searchQuery)}`
          );
          if (response.data.results) {
            setSearchResults(response.data.results);
          } else {
            console.error("Search request failed");
          }
        } catch (error) {
          console.error("An error occurred during search:", error);
        }
      };

      const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        handleSearch(); 
        if (value.trim() !== "") {
            handleSearch();
          } else {
            setSearchResults([]); 
          }
      };


    

        return (
            <>
                <div className="mt-24 w-full bg-white dark:bg-gray-900 md:px-32 px-5">
                    <div className="search-section lg:w-1/3 md:w-2/3 w-full  py-5">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-blue-900 bg-blue-200 border border-e-0 border-blue-300 rounded-s-md  ">
                            <CiSearch className="text-xl" />
                            </span>
                            <input
                            type="search"
                            id="search"
                            className="rounded-none rounded-e-lg bg-blue-700/15 border border-blue-300 text-blue-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                            placeholder="Search Song by Title, Artist or Albums"
                            value={searchQuery}
                            onChange={handleInputChange} 
                            // onKeyDown={handleKeyDown}
                            
                            />
                        </div>
                    </div>

                    <div className="pt-5">
                    {searchResults.length > 0 ? (
                        <SearchResult results={searchResults} key="search-results"/>
                    ) : (
                        <>
                            <TopSongs key="top-songs" />
                            <TopAlbums key="top-albums" />

                        </>
                    )}
                    </div>


                </div>
            </>
        )
}

export default Home