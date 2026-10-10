import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { useState,ChangeEvent  } from "react"
import { emailRegex } from "../Utility/RegEx"
import toast from "react-hot-toast"
import axios from "axios"
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons"
import { useGoogleLogin } from "@react-oauth/google"


const Login = () => {

  const [userdetail, setuserdetail] = useState({
    password:"",
    email:"",
  })

  const [Show, setShow] = useState(false)

  const navigate = useNavigate()

  function handleInputChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
    const {name,value} = event.target;
    // console.log(name,value);

    setuserdetail((prev)=> ({
      ...prev,[name]: value
    }));
    
    console.log(userdetail);
    
    
  }

  const handleLogin = async() => {
    if (!emailRegex.test(userdetail.email)) {
      toast.error("Please enter a valid Email address")
      return;
    }
    if (!userdetail.password) {
      toast.error("Please enter your password");
      return;
    }
    try {

      console.log("Data login:", userdetail);
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/login`,userdetail 
      );
      console.log(response);
      toast.success(response.data.message);

      localStorage.setItem("token",response.data.token);
      navigate("/home")
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse:any) =>{
      try {
        console.log(tokenResponse);

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {headers:{Authorization:`Bearer ${tokenResponse.access_token}`}});

        console.log(res.data);

        const googlePayload = {
          username : res.data.name,
          email : res.data.email,
        }
        console.log("Google login payload:", googlePayload);

        console.log("Data login:", googlePayload);
        const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/google-login`,googlePayload
        );
        console.log(response);
        toast.success(response.data.message);

        localStorage.setItem("token",response.data.token);
        navigate("/home")
      } catch (error:any) {
        console.log(error);
        toast.error(error.response?.data?.message || "Google login failed");
      }
    },
    onError:(error:any)=>{
      console.log(error);
      toast.error("Google login cancelled or failed");
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Login..</h2>
        <div className={styles.social}>
          <div><FacebookLoginButton></FacebookLoginButton></div>
          <div onClick={() => handleLoginWithGoogle()}>
            <GoogleLoginButton></GoogleLoginButton>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <input 
          value={userdetail.email}
          placeholder="Enter your Email.." type="email"name="email" onChange={handleInputChange} />
          <div className={styles.passwordContainer}> 
          <input 
          value={userdetail.password}
          placeholder="Enter your Password.." type={Show? "text" : "password"} name="password" onChange={handleInputChange} />
          <button onClick={()=>{
            setShow(!Show)
          }}>{Show ? "Hide" : "Show"}</button>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className={styles.footer}>
        <Link to="/signup">Don't have account? Sign Up</Link>
        <Link to="/forget-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;