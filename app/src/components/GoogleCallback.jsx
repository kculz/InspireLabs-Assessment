import { useEffect, useState } from "react";
import { Axios } from "../../config";
import { userStore } from "../helper";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:8000/api/auth/callback${location.search}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
        userStore(res.data.token);
        setLoading(false);
        setData(res.data);
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
    return <h1 className="text-center text-3xl font-bold">Loading...</h1>;
  } else if(!user){
    return(
        <p className="text-center text-3xl font-bold">Redirecting...</p>
    )
  }else{
    return (
       null
    );
  }
};

export default GoogleCallback;