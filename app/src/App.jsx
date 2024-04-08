import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { Landing, NotFound, Signin, Signup } from "./pages";
import { Logout, Navbar, ProtectedRoute } from "./layouts";
import { AddAlbums, AddArtists, AddSongs, AllSongs, GoogleCallback, Home, Profile } from "./components";
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
          <Route path="/auth/google/callback" element={<GoogleCallback />} />

          <Route path="/add-artists" element={<AddArtists />} />
          <Route path="/add-albums" element={<AddAlbums />} />
          <Route path="/add-songs" element={<AddSongs />} />


          <Route element={<ProtectedRoute />} >
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/all-songs" element={<AllSongs />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
