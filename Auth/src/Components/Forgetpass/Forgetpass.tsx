import { useState } from "react"
import styles from "./Forgetpass.module.css"


const Forgetpass = () => {

  const [step, setstep] = useState(0)

  
  return (
  <div className={styles.Container}>
 <div className={styles.formContainer}>
  <h2>Forget Password</h2>
  {step === 0 && <Emailcomponent/>}
  {step === 1 && <OTPcomponent/>}
  {step === 2 && <Passwordcomponent/>}
 </div>
 </div>
  )
}

export default Forgetpass

const Emailcomponent =() =>{
  const [email,setemail]= useState("");
  return (
    <div className={styles.inputContainer}>
      <input 
          value={email}
          placeholder="Enter your Email.." type="email"name="email" onChange={(e)=>{setemail(e.target.value)}} 
          /> 
          <button>Get OTP</button>
    </div>
  )
}
const OTPcomponent =() =>{
  const [OTP,setOTP]= useState("");
  return (
    <div className={styles.inputContainer}>
      <input 
          value={OTP}
          placeholder="Enter your OTP" type="text" onChange={(e)=>{setOTP(e.target.value)}} 
          /> 
          <button>Verify OTP</button>
    </div>
  )
}
const Passwordcomponent =() =>{
  const [password,setpassword]= useState("");
  const [Show, setShow] = useState(false)
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
            <button>Reset Password</button>
          </div>
    </div>
  )
}