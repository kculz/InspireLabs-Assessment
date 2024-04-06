import { userData } from "../helper"
import Header from "./Header";

const Navbar = () => {
    const {token} = userData();

    if(!token){
        return(
            null
        )
    }else{
        return (
            <Header />
        )
    } 
}

export default Navbar