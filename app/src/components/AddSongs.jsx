import { useEffect, useState } from "react";
import { Axios } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddSongs = () => {
  const [song, setSong] = useState({
    title: "",
    track: "",
    artist_id: "",
    album_id: "",
    cover_art: ""
})

const [artists, setArtists] = useState([]);
const [albums, setAlbums] = useState([]);

useEffect(() => {
  const getArtists = async () => {
    await Axios.get('/artists', {
      headers: {
        Accept: "application/json"
      }
    }).then(res => {
      if (res.data.artists) {
        setArtists(res.data.artists);
      } else {
        toast.error("Something went wrong.");
      }
    }).catch(err => {
      toast.error(err);
    });
  };

  getArtists();
}, []);


  const getAlbums = async () => {
    try {
      // Add a delay of 500 milliseconds before making the request
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await Axios.get('/albums', {
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.data.albums) {
        setAlbums(response.data.albums);
      } else {
        toast.error('Something went wrong.');
      }
    } catch (error) {
      toast.error(error);
    }
  };

useEffect(() =>{
  getAlbums();
},[])

const navigate = useNavigate()

const addSongs = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", song.title);
    formData.append("track", song.track);
    formData.append("artist_id", song.artist_id);
    formData.append("album_id", song.album_id);
    formData.append("cover_art", song.cover_art);

    await Axios.post('/add-songs', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then( res => {
        if(res.data.error){
            toast.error(res.data.error);
        }else if(res.data.message){
            toast.success(res.data.message);
            navigate('/home');
        }else{
            toast.success("Something went wrong. Please try again!");
        }
    }).catch(err => {
        console.log(err)
        toast.error(err.response.data.message);
    })
}

const handleArtistChange = (e) => {
  const selectedArtistId = e.target.value;
  setSong(prevState => ({ ...prevState, artist_id: selectedArtistId }));
};

  return (
    <div className="w-full h-[100vh] bg-white dark:bg-gray-900">
        <section className="mt-24">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Song</h2>
                
                <form action="#" onSubmit={addSongs} encType="multipart/form-data">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Song&apos;s title</label>
                            <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type the Album title" required="" 
                            onChange={(e) => setSong({ ...song, title: e.target.value })}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="artist_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Artist</label>
                            <select
                              name="artist_id"
                              id="artist_id"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={handleArtistChange}
                              value={song.artist_id}
                            >
                              <option value="">Select an Artist</option>
                              {artists.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                  {artist.name}
                                </option>
                              ))}
                            </select>
                        </div>

                        <div className="w-full">
                          <label htmlFor="album_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Album</label>
                          <select
                            name="album_id"
                            id="album_id" // Changed the id to "album_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSong({ ...song, album_id: e.target.value })}
                          >
                            <option>Select Album</option>
                            {albums
                              .filter((album) => album.artist_id == song.artist_id)
                              .map((album) => (
                                <option key={album.id} value={album.id}>
                                  {album.title}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="w-full">
                            <label htmlFor="track" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Import Song</label>
                            <input type="file" accept="audio/mpeg" name="track" id="track" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSong({ ...song, track: e.target.files[0] })}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="cover_art" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Import Cover Art</label>
                            <input type="file" name="cover_art" id="cover_art" accept="images" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) =>
                                setSong({ ...song, cover_art: e.target.files[0] })
                              }
                            />
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Add Artist
                    </button>
                </form>
            </div>
        </section>
    </div>
  )
}

export default AddSongs