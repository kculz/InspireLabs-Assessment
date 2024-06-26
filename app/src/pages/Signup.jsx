import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../config";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {

    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        confirm_password: ""
    })

    const navigate = useNavigate()

    const handleSignup = async(e) => {
        e.preventDefault();

        if(values.password !== values.confirm_password){
            toast.error("Passwords does not match.");
        }
    
        await Axios.post('/register', values).then(res => {
            const statusCode = res.status
            if (statusCode === 200){
                console.log("success");
                console.log(res)
                toast.info("welcome")
                navigate('/signin');
                window.location.reload();
            }else{
                toast.warn("Erroor whilst logging in . PLease try again.")
            }     
          
        }).catch(err => {
          console.log(err);
          toast.warn(err.response.data.message || "Invalid credentials");
        })
      }

      const handleGoogleLogin = async() => {
        await Axios.get('/auth/google').then( res => {
    
          console.log(res.data);
          const relativeUrl = res.data.url.replace('http://localhost:3000', '');
          window.location.href = relativeUrl;
        }).catch(err => {
          console.log(err);
        })
      }
  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignup}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                                onChange={(e) => setValues({...values, email: e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="full name" required="" 
                                onChange={(e) => setValues({...values, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                onChange={(e) => setValues({...values, password: e.target.value})}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="confirm_password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                                onChange={(e) => setValues({...values, confirm_password: e.target.value})}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                            </p>

                            <p onClick={handleGoogleLogin} className="w-full border border-gray-700 text-white px-2.5 py-2.5 cursor-pointer rounded my-3 text-sm text-center ">
                              <div className="flex gap-3 justify-center items-center">
                                  <FcGoogle className="text-xl" />
                                  <p>Sign up with Google</p>
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

export default Signup