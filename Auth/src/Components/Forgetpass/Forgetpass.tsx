import { useState } from "react"
import styles from "./Forgetpass.module.css"
import { emailRegex, passwordRegex } from "../Utility/RegEx"
import toast from "react-hot-toast"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


const Forgetpass = () => {

  const [step, setstep] = useState(0)

  
  return (
  <div className={styles.Container}>
 <div className={styles.formContainer}>
  <h2>Forget Password</h2>
  {step === 0 && <Emailcomponent setstep={setstep}/>}
  {step === 1 && <OTPcomponent setstep={setstep}/>}
  {step === 2 && <Passwordcomponent />}
 </div>
 </div>
  )
}

export default Forgetpass

const Emailcomponent =({setstep}) =>{
  const [email,setemail]= useState("");

  const getOTP = async () => {

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid Email address")
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,{email});
      toast.success(response.data.message)
      localStorage.setItem("email",email)
      setstep(1)
    } catch (error:any) {
      toast.error(error.response.data.message)
      localStorage.setItem("email",email)
    }
  }

  return (
    <div className={styles.inputContainer}>
      <input 
          value={email}
          placeholder="Enter your Email.." type="email"name="email" onChange={(e)=>{setemail(e.target.value)}} 
          /> 
          <button onClick={getOTP}>Get OTP</button>
          <Link  to="/">Wanna login?</Link>
    </div>
  )
}
const OTPcomponent =({setstep}) =>{
  const [OTP,setOTP]= useState("");

  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/verifypassOTP`,{OTP});
      toast.success(response.data.message)

      setstep(2)
    } catch (error:any) {
      toast.error(error.response.data.message + "Please try again")
      setstep(0)
      
    }
  }
  return (
    <div className={styles.inputContainer}>
      <input 
          value={OTP}
          placeholder="Enter your OTP" type="text" onChange={(e)=>{setOTP(e.target.value)}} 
          /> 
          <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  )
}
const Passwordcomponent =({email}) =>{
  const [password,setpassword]= useState("");
  const [Show, setShow] = useState(false)
  const navigate = useNavigate()

  const resetPassword = async () => {
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters and must include at least one special characters and one number")
      return;
    }

     try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,{password, isOTPVerified:true,email:localStorage.getItem("email")});
      toast.success(response.data.message)

      navigate("/")
      localStorage.removeItem("email")
    } catch (error:any) {
      toast.error(error.response.data.message)
      
    }

  }


  return (
    <div className={styles.passwordComponent}>
    <div className={styles.passwordContainer}>
      <input 
          value={password}
          placeholder="Enter new Password" type={Show? "text" : "password"} name="password" onChange={(e)=>{setpassword(e.target.value)}} />
          <button onClick={()=>{
            setShow(!Show)
          }}>{Show ? "Hide" : "Show"}</button>
    </div>
    <div className={styles.inputContainer}>
            <button onClick={resetPassword}>Reset Password</button>
          </div>
    </div>
  )
}