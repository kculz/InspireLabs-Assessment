import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../config";
import { toast } from "react-toastify";
import { useState } from "react";
import { userStore } from "../helper";

const Signin = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  
  const handleLogin = async(e) => {
    e.preventDefault();

    await Axios.post('/login', values).then((res) => {
      if(res.data.data.message == "success"){
        userStore(res.data.data)
        navigate('/home');
        window.location.reload();
      }
      
    }).catch((err) => {
      console.log(err)
      if(err.response.data.error){
        toast(err.response.data.error)
      }
    })
  }

  const handleGoogleLogin = async() => {
    await Axios.get('/auth/google', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then( res => {

      console.log(res.data);
      const relativeUrl = res.data.url.replace('http://localhost:5173', '');
      window.location.href = relativeUrl;
    }).catch(err => {
      console.log(err);
    })
  }
  
  return (
      <>
        <section className="bg-gray-50 dark:bg-gray-900 w-full h-[100vh]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                      </h1>
                      <form className="" action="#" onSubmit={handleLogin}>
                      <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                                onChange={(e) => setValues({...values, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                onChange={(e) => setValues({...values, password: e.target.value})}
                                />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5">Sign in</button>
                         

                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don&apos;t have an account? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up here</Link>
                          </p>

                          <p onClick={handleGoogleLogin} className="w-full border border-gray-700 text-white px-2.5 py-2.5 cursor-pointer rounded my-3 text-sm text-center ">
                              <div className="flex gap-3 justify-center items-center">
                                  <FcGoogle className="text-xl" />
                                  <p>Sign in with Google</p>
                              </div>
                          </p>
                         
                      </form>
                  </div>
              </div>
          </div>
        </section>
      </>
  )
}

export default Signin