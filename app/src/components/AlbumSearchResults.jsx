
import { FcMusic } from "react-icons/fc";
import { MdFavoriteBorder } from "react-icons/md";
import { Axios } from '../../config';
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const AlbumSearchResults = ({ results }) => {
    console.log(results)
    const tracks = results[5];
    const cover_art = results[4];
    const artist = results[1];
    const summary = results[3];
    const released = results[2];
    const title = results[0];

   
    const addAlbumToFav = async (album_title, artist, cover_art, track_no) => {

            const data = {
                album_title, artist, cover_art, track_no
            }
            await Axios.post('/fav-albums', data).then(res => {
              toast.info(res.data.message)
            }).catch(err => {
              console.log(err)
              toast.warn("Failed to add album to favourites")
            })
    }
  return (
    <div>
        <div className="lg:flex block gap-5">
          <article className="p-5 min-h-116 max-w-sm w-full content bg-cover bg-center h-64  bg-gray-200 rounded-xl text-gray-600 transform duration-500 hover:-translate-y-1 cursor-pointer" style={{backgroundImage: `url(${cover_art})`}}>
          
          </article>
          <div className="flex flex-col justify-end">
            <div className="p-5 text-white">
                <h1 className="mt-5 text-2xl md:text-3xl font-light leading-snug min-h-33">
                {artist}
                </h1>
                <div className="mt-1 ">
                    <div className="mt-1 flex justify-between">
                        <div>
                        <span className="text-xl text-gray-300">Album - </span>
                        <span className="font-bold text-xl">{title}</span>
                        </div>
                        <MdFavoriteBorder 
                        className='text-2xl text-red-600'
                        // eslint-disable-next-line react/prop-types
                        onClick={() => addAlbumToFav(title, artist, cover_art, tracks.length)}
                        />
                    </div>
                </div>
                <div className="mt-1 flex justify-between">
                <span className="p-3 pl-0 font-bold">release date:</span>
                <span className="p-3 text-base ">
                {released}
                </span>
                </div>
                <p className='text-sm'>{summary.split('. ')[0]}</p>
            </div>
          </div>
        </div>
      
        <h1 className='text-xl md:text-3xl md:font-bold font-semibold text-gray-900 dark:text-white mt-5'>Tracks list</h1>
        <div className="flex flex-col  my-5">
          {
            // eslint-disable-next-line react/prop-types
            tracks.map((track, index) => {
              return (
                <div className=" w-full flex py-2 border-b border-gray-900 dark:border-gray-500/20 items-center justify-between" key={index}>
                  <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <FcMusic className='text-xl'/>
                    <p className='text-white'>{index + 1}</p>
                  </div>
                  <p className='text-gray-600'>{track}</p>
                  </div>
                 
                </div>
              )
            })
          }
        </div>

    </div>
  );
};

export default AlbumSearchResults;