import { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight, BiLogOutCircle } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import { FcMusic } from "react-icons/fc";

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const handleNav = () => {
        setOpenNav(false);
    }
  return (
    <>
        <header className="z-50 top-0  w-screen h-24 text-off-white bg-blue-700/15 fixed">
            <div className="flex justify-between items-center px-10 md:px-32 h-full w-full">
                <h1 className="text-2xl lg:text-3xl font-semibold"><Link onClick={handleNav} to="home">
                        <div className="flex items-center justify-center">
                        <FcMusic className="text-7xl font-Luckiest animate-bounce"/>
                        <h1 className="text-5xl font-Luckiest">Music</h1>
                        </div>
                    </Link></h1>
                <div className="flex gap-5 justify-center items-center">
                <ul className="hidden md:flex gap-5 text-xs lg:text-sm text-gray-900">
                    <li><Link title="logout" onClick={handleNav} to="/logout"><BiLogOutCircle className="text-2xl text-orange-600" /></Link></li>
                </ul>
                <div className="block">
                    <Link to="/profile" className=" py-3 px-5 rounded" onClick={handleNav}>My Profile</Link>
                </div>
                <Link onClick={() => setOpenNav(!openNav)} className="md:hidden block">
                    {
                        !openNav ? <BiMenuAltRight size={30} className="text-lt-red"/> : <MdOutlineClose size={30} className="text-lt-red"/>
                    }
                </Link>
                </div>
            </div>
            { openNav &&
            <ul className="bg-black/50 backdrop-blur md:hidden flex flex-col px-10 gap-4 top-24 ">
                <li><Link title="logout" onClick={handleNav} to="/logout">Logout</Link></li>
                <hr className="text-lt-red" />
            </ul>
            }
        </header>
    </>
  )
}

export default Header