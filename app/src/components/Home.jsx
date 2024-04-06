import { useEffect, useState } from "react";
import { Axios } from "../../config";
import { userStore } from "../helper";
import { useLocation } from "react-router-dom";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect( () => {

        const fetchData = async () => {
            await Axios.get(`http://localhost:8000/api/auth/callback${location.search}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
                userStore(res.data.token);
                setLoading(false);
                setData(res.data);
            }).catch(err => {
                console.log(err);
            })
        }

        fetchData();
    }, [location]);

    useEffect(() => {
        const fetchUserData = async () => {
            await Axios.get('/user', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `${data.token_type } ${data.token}`
                }
            }).then((res) => {
                setUser(res.data);
            }).catch(err => {
                console.log(err);
            })
        }

        fetchUserData();
    }, [data])


    if(loading){
        return (
            <h1 className="text-center text-3xl font-bold">Loading...</h1>
        )
    }else{
        return (
            <>
                <div>
                    <samp>{JSON.stringify(user, null, 2)}</samp>
                </div>
            </>
        )
    }

}

export default Home