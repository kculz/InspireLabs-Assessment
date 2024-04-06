import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { userData } from "../helper";

const ProtectedRoute = () => {
    let {token} = userData();
    let auth = {'token': token};
  return (
        <React.Fragment>
            {auth.token? <Outlet /> : <Navigate to="/signin" />}
        </React.Fragment>
  )
}

export default ProtectedRoute