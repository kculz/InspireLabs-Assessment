import { useEffect, useState } from "react";
import { CiHeart, CiPlay1 } from "react-icons/ci";
import { Axios } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TopSongs = () => {
    const [topSongs, setTopSongs] = useState([]);

    useEffect(() => {
        const getSongs = async() => {
            await Axios.get('/top-songs', {
                headers: {
                    Accept: "application/json"
                }
            }).then( res => {
                if(res.data.songs){
                    console.log(res.data.songs)
                    setTopSongs(res.data.songs);
                }else{
                    toast.warn(res.data.error);
                }
            }).catch(err => {
                console.log(err);
                toast.error("Internal server error.");
            })
        };

        getSongs();
    }, [])
  return (
    <div className="top-songs w-full">

                        <section className="container mx-auto transform duration-500 p-5">
        
                           
                            <div className="flex justify-between items-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 dark:text-white tracking-tight mt-4 mb-4 md:mt-8 md:mb-8">
                                Top Songs
                            </h1>
                            <Link to="/songs" className="text-lg text-blue-600">All songs...</Link>
                            </div>
                            <p className="max-w-5xl text-lg sm:text-2xl sm:leading-10 space-y-6 mb-6 text-gray-700">
                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit est obcaecati numquam dolor. Eligendi et magni molestiae blanditiis dolor.
                            </p>
                                
                        </section>

                        <section className="mx-auto p-10 md:py-20  md:p-10">
                            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">

                                {
                                    topSongs.map((song, index) => {
                                        return(
                                            <article key={index} className="mx-auto  w-full shadow-2xl max-w-md pb-8 rounded-b-2xl transform duration-500 hover:-translate-y-2">
                                            <section className="content bg-cover bg-center h-64 rounded-2xl" style={{backgroundImage: `url(http://127.0.0.1:8000/storage/${song.cover_art})`}}>
                                                <div className="flex items-end w-full h-full bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded-2xl">
                                                    <div className="w-1/2 flex items-center">
                                                        <div className="">
                                                        <CiPlay1 className="text-2xl hover:animate-spin" />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2 flex items-center flex-row-reverse">
                                                        <CiHeart className="text-2xl hover:animate-ping" title="add to fav"/>
                                                    </div>
                                                </div>
                                            </section>
                                           
                                            <div className="mt-14 px-4">
                                                <h2 className="mt-4 text-base font-medium text-gray-400">{song.title} by {song.artist.name}</h2>
                                                <p className="mt-2 text-2xl text-gray-700">{song.album.title}</p>
                                            </div>
                                        </article>
                                        )
                                    })
                                }


                            </section>
                           
                        </section>

                        </div>
  )
}

export default TopSongs