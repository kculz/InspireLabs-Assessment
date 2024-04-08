import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Axios } from "../../config";

const Signin = () => {

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
                      <form className="" action="#">
                          <p onClick={handleGoogleLogin} className="w-full border border-gray-700 text-white px-2.5 py-2.5 cursor-pointer rounded my-3 text-sm text-center ">
                              <div className="flex gap-3 justify-center items-center">
                                  <FcGoogle className="text-xl" />
                                  <p>Sign in with Google</p>
                              </div>
                          </p>

                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don&apos;t have an account? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up here</Link>
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