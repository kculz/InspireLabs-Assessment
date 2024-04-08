import { useState } from "react"
import { Axios } from "../../config"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddArtists = () => {

    const [artist, setArtist] = useState({
        name: "",
        bio: ""
    })

    const navigate = useNavigate()

    const addArtists = async (e) => {
        e.preventDefault()
        await Axios.post('/add-artists', artist, {
            headers: {
                Accept: "application/json"
                // Add Authorization for authenticated users
            }
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
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Artist</h2>
                
                <form action="#" onSubmit={addArtists}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist&apos;s Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type artist's name" required="" 
                            onChange={(e) => setArtist({...artist, name: e.target.value})}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                            <textarea id="bio" name="bio" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="bio"
                            onChange={(e) => setArtist({...artist, bio: e.target.value})}
                            ></textarea>
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

export default AddArtists