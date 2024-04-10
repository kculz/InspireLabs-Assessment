import { useEffect, useState } from "react"
import { Axios } from "../../config"

const Profile = () => {

  const [data, setUser] = useState([])

  useEffect(() => {
    const getUserData = async() => {
      await Axios.get('/profile').then(res => {
        setUser(res.data.data)
      }).catch(err => {
        console.log(err);
      })
    }
    getUserData();
  }, []);


  console.log(data)
  return (
   <div className="mt-24 py-10 px-10 md:px-32">
    <div className="flex flex-col">
        <article className="p-10 min-h-116 max-w-3xl w-full bg-orange-600 rounded-xl text-gray-100 xl:col-span-2 transform duration-500 hover:-translate-y-1 cursor-pointer">
        <h1 className="mt-5 text-5xl font-light text-gray-100 leading-snug min-h-33">
        {data.user && data.user.name}
        </h1>
                <div className="mt-20">
                    <span className="text-xl">Email Address - </span>
                    <span className="font-bold text-xl">{data.user && data.user.email}</span>
                </div>
                <div className="mt-8flex flex-col  ">
                  <p className="text-xs">Favourite Artists</p>
                    <div className="flex gap-5">
                      {
                        data.artists && data.artists.map(({artist}, index) => {
                          return (
                            `# ${artist}`
                          )
                        })
                      }
                    </div>
                </div>
          </article>

          <h1 className="mt-5 text-2xl text-white">Top Albums</h1>
          {
            data.albums && data.albums.map(({album_title, artist}, index) => {
              return (
                <div className="flex gap-5 items-center" key={index}>
                  <h1 className="text-2xl  text-gray-600 my-3">{album_title}</h1>
                  <p className="text-sm text-gray-600">{artist}</p>
                </div>
              )
            })
          }
    </div>
   </div>
  )
}

export default Profile