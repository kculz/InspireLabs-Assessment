import { CiSearch, CiHeart, CiPlay1 } from "react-icons/ci";

const Home = () => {
   
        return (
            <>
                <div className="mt-24 w-full bg-white md:px-32 px-5">
                    <div className="search-section lg:w-1/3 md:w-2/3 w-full  py-5">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-blue-900 bg-blue-200 border border-e-0 border-blue-300 rounded-s-md  ">
                            <CiSearch className="text-xl" />
                            </span>
                            <input type="search" id="search" className="rounded-none rounded-e-lg bg-blue-700/15 border border-blue-300 text-blue-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  " placeholder="Search Song by Title, Artist or Albums" />
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="top-songs w-full">

                        <section className="container mx-auto transform duration-500 p-5">
        
                           
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mt-4 mb-4 md:mt-8 md:mb-8">
                                Top Songs
                            </h1>
                            <p className="max-w-5xl text-lg sm:text-2xl sm:leading-10 space-y-6 mb-6 text-gray-700">
                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit est obcaecati numquam dolor. Eligendi et magni molestiae blanditiis dolor.
                            </p>
                                
                        </section>

                        <section className="mx-auto p-10 md:py-20  md:p-10">
                            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                                <article className="mx-auto  w-full shadow-2xl max-w-md pb-8 rounded-b-2xl transform duration-500 hover:-translate-y-2 cursor-pointer">
                                    <section className="content bg-cover bg-center h-64 rounded-2xl" style={{backgroundImage: `url('https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGxhbmRzY2FwZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=100')`}}>
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
                                        <h2 className="mt-4 text-base font-medium text-gray-400">Song Title, Artist</h2>
                                        <p className="mt-2 text-2xl text-gray-700">Album Title</p>
                                    </div>
                                </article>

                            </section>
                           
                        </section>

                        </div>
                        <div className="top-albums">

                        </div>
                    </div>


                </div>
            </>
        )
    

}

export default Home