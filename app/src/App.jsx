import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Landing, NotFound, Signin, Signup } from "./pages";
import { Logout, Navbar } from "./layouts";
import { Home } from "./components";
import { userData } from "./helper";

function App() {
  const user = userData();
  return (
    <>
      <BrowserRouter>
      <Navbar user={user} />
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

            <Route path="/auth/google/callback" element={<Home />} />
            <Route path="/logout" element={<Logout />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
