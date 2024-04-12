import { useState } from "react";
import { Link } from "react-router-dom";
import {  BiLogOutCircle } from 'react-icons/bi'
import { FcMusic } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const handleNav = () => {
        setOpenNav(false);
    }
  return (
    <>
        <header className="z-50 top-0  w-screen h-24  bg-white dark:bg-gray-900 fixed">
            <div className="flex justify-between items-center px-10 md:px-32 h-full w-full">
                <h1 className="text-2xl lg:text-3xl font-semibold"><Link onClick={handleNav} to="home">
                        <div className="flex items-center justify-center">
                        <FcMusic to="/music" className="text-7xl font-Luckiest animate-bounce"/>
                        <h1 className="text-5xl text-gray-900 dark:text-white font-Luckiest">Music</h1>
                        </div>
                    </Link></h1>
                <div className="flex gap-5 justify-center items-center">
                <ul className="hidden md:flex gap-5 text-xs lg:text-sm text-gray-900">
                    <li><Link title="logout" onClick={handleNav} to="/logout"><BiLogOutCircle className="text-2xl text-orange-600" /></Link></li>
                </ul>
                <div className="block">
                    <Link to="/profile" className=" py-3 px-5 rounded text-gray-900 dark:text-white " onClick={handleNav}><CgProfile className="text-2xl text-gray-600 dark:text-white" /></Link>
                </div>
                <Link onClick={() => setOpenNav(!openNav)} className="md:hidden block">
                    {
                        !openNav && <Link to="/logout"><BiLogOutCircle className="text-2xl text-orange-600" /></Link>
                    }
                </Link>
                </div>
            </div>
            {/* { openNav &&
            <ul className="bg-black/50 backdrop-blur md:hidden flex text-gray-900 dark:text-white  flex-col px-10 gap-4 top-24 ">
                <li><Link title="logout" onClick={handleNav} to="/logout">Logout</Link></li>
                <hr className="text-gray-900" />
            </ul>
            } */}
        </header>
    </>
  )
}

export default Header