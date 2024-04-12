import { useEffect, useState } from "react";
import { Axios } from "../../config";
import { userStore } from "../helper";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          `/auth/callback${location.search}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
        console.log(res.data.token)
        if(res.data){
          userStore(res.data);
          setLoading(false);
          setData(res.data);
          console.log(res.data)
        }else{
          toast.warn("Something went wrong")
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [location]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await Axios.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${data.token_type} ${data.token}`
          }
        });
        console.log(data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (data.token) {
      fetchUserData();
    }
  }, [data, navigate]);

  useEffect(() => {
    if (user) {
        window.location.reload();
        window.location.href = "/home"
    }
  }, [user, navigate]);

  if (loading) {
    return <h1 className="text-center text-3xl font-bold dark:text-white">Redirecting...</h1>;
  } else if(!user){
    return(
        <p className="text-center text-3xl font-bold dark:text-white">Loading...</p>
    )
  }else{
    return (
       null
    );
  }
};

export default GoogleCallback;