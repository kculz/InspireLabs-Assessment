import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Axios } from "../../config"
import { toast } from "react-toastify"

const AddAlbums = () => {
    const [album, setAlbum] = useState({
        title: "",
        artist_id: "",
        cover_art: ""
    })

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const getArtists = async() => {
            await Axios.get('/artists', {
                headers: {
                    Accept: "application/json"
                }
            }).then(res => {
                if(res.data.artists){
                    setArtists(res.data.artists);
                }else{
                    toast.error("Something went wrong.");
                }
            }).catch(err => {
                toast.error(err);
            })
        }

        getArtists();
    }, []);

    const navigate = useNavigate()

    const addAlbums = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("title", album.title);
        formData.append("artist_id", album.artist_id);
        formData.append("cover_art", album.cover_art);

        await Axios.post('/add-albums', formData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                // Add Authorization for authenticated users
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
            toast.error(err.response.message);
        })
    }
  return (
    <div className="w-full h-[100vh] bg-white dark:bg-gray-900">
        <section className="mt-24">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Album</h2>
                
                <form action="#" onSubmit={addAlbums} encType="multipart/form-data">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist&apos;s Album Title</label>
                            <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type the Album title" required="" 
                            onChange={(e) => setAlbum({...album, title: e.target.value})}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="artist_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Artist</label>
                            <select name="artist_id" id="artist_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) =>
                                setAlbum({ ...album, artist_id: e.target.value })
                              }
                            >
                                <option>Select Artist</option>
                            {artists.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                {artist.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="cover_art" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Import Cover Art</label>
                            <input type="file" name="cover_art" id="cover_art"
                            onChange={(e) =>
                                setAlbum({ ...album, cover_art: e.target.files[0] })
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

export default AddAlbums