
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";


const Auth = () => {
  return IsLoggedIn() ? <Outlet/> : <Navigate to="/"/>
}

export default Auth

const IsLoggedIn = () =>{
  const token = localStorage.getItem("token");

  if(!token || token === "undefined" || token === "null") {
    return false;
  }

  try {
    const {exp} = jwtDecode<{exp?: number}>(token);

    console.log(exp, Date.now());

    if(!exp) {
      localStorage.removeItem("token");
      return false;
    }

    if(exp * 1000 > Date.now()) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch {
    localStorage.removeItem("token");
    return false;
  }
}