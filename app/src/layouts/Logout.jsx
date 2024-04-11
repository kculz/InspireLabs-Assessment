import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../../config";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        
        const logout = await Axios.get('/logout');

        if(!logout){
          toast.warn("something went wrong")
        }
        localStorage.removeItem("user");
        navigate("/signin");
        toast.success("Logged out!");
        window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
        // Handle error or display error toast
        toast.error("Logout failed");
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;