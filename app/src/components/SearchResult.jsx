import PropTypes from 'prop-types';
import { CiHeart } from 'react-icons/ci';
import { FcMusic } from "react-icons/fc";
import { MdFavoriteBorder } from "react-icons/md";
import { Axios } from '../../config';
import { toast } from "react-toastify"

const SearchResult = ({ results }) => {
    const info = results[0];
    const topTracks = results[1];
    const topAlbums = results[2];


    const addAlbumToFav = async (album_title, artist, cover_art, track_no) => {

      const data = {
          album_title, artist, cover_art, track_no
      }
      await Axios.post('/fav-albums', data).then(res => {
        toast.info(res.data.message)
      }).catch(err => {
        console.log(err)
        toast.warn("Failed to add song to favourites")
      })
}


const addArtistToFav = async (artist,) => {

  const data = {
      artist
  }
  await Axios.post('/fav-artists', data).then(res => {
    toast.info(res.data.message)
  }).catch(err => {
    console.log(err)
    toast.warn("Failed to add song to favourites")
  })
}
  return (
    <div>
        <h1 className='text-2xl text-gray-900 dark:text-white'>Artist Info
        <MdFavoriteBorder className='text-red-600 text-2xl animate-pulse hover:animate-ping cursor-pointer'
                  onClick={() => addArtistToFav(info.artist.name)} /> <span className="text-xs text-gray-200">add to favourites</span>
        </h1>
        <p className='text-sm text-gray-500' >{info.artist.name}</p>
        <p className='text-sm text-gray-300'>{info.artist.bio.summary.split('. ')[0]}</p>

        <h1 className='text-sm text-gray-900 dark:text-white my-1'>Related Artists</h1>
        <div className="flex gap-5">
        <p className='text-xs text-gray-500' >
          {info.artist.similar.artist.map(({name}) => {
            return(
              `#${name} `
            )
          })}
          </p>
        </div>

        <h1 className='text-xl md:text-3xl md:font-bold font-semibold text-gray-900 dark:text-white mt-5'>Top Tracks</h1>
        <div className="flex flex-col  my-5">
          {
            topTracks.toptracks.track.map(({name}, index) => {
              return (
                <div className=" w-full flex py-2 border-b border-gray-900 dark:border-gray-500/20 items-center justify-between" key={index}>
                  <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <FcMusic className='text-xl'/>
                    <p className='text-white'>{index + 1}</p>
                  </div>
                  <p className='text-gray-600'>{name}</p>
                  </div>
                
                </div>
              )
            })
          }
        </div>

        <h1 className='text-xl md:text-3xl md:font-bold font-semibold text-gray-900 dark:text-white mt-5'>Top Albums</h1>
        <div className="grid md:grid-cols-5 grid-flow-row gap-5 place-content-center items-center">
          {
            topAlbums.topalbums.album.map(({name, image}, index) => {
              return (
                <article key={index} className="mx-auto  w-full shadow-2xl max-w-md pb-8 rounded-b-2xl transform duration-500 hover:-translate-y-2">
                <section className="content bg-cover bg-center h-52 rounded-2xl" style={{backgroundImage: `url(${image[3]['#text']})`}}>
                    <div className="flex items-end w-full h-full group bg-black bg-opacity-20 text-white text-sm font-bold  p-4 rounded-2xl">
                        <div className="w-1/2 flex items-center">
                            <p className='text-xs cursor-pointer'>Add to favourites</p>
                        </div>
                        <div className="w-1/2 flex items-center flex-row-reverse">
                            <CiHeart className="text-2xl text-red-900 font-bold  group-hover:animate-ping" title="add to fav"
                              onClick={() => addAlbumToFav(name,info.artist.name, image[0]['#text'], 0)}
                            />
                        </div>
                    </div>
                </section>
               
                <div className="mt-14 px-4">
                    <h2 className="mt-4 text-base font-medium text-gray-400">{name}</h2>
                    {/* <p className="mt-2 text-2xl text-gray-700">{song.album.title}</p> */}
                </div>
            </article>
              )
            })
          }
        </div>



    </div>
  );
};

SearchResult.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        similar: PropTypes.object.isRequired
      }),
      album: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      toptracks: PropTypes.shape({
        track: PropTypes.array.isRequired,
      }),
      topalbums: PropTypes.shape({
        album: PropTypes.array.isRequired,

      })
      // Add additional prop types as needed
    })
  ).isRequired,
};

export default SearchResult;