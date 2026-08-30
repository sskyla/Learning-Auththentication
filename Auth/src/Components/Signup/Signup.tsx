import { Link } from "react-router-dom"
import styles from "./Signup.module.css"
import { useState,ChangeEvent  } from "react"
import { emailRegex, passwordRegex } from "../Utility/RegEx"
import toast from "react-hot-toast"

const Signup = () => {

  const [userdetail, setuserdetail] = useState({
    username: "",
    password:"",
    email:"",
  })

  const [Show, setShow] = useState(false)

  function handleInputChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
    const {name,value} = event.target;
    // console.log(name,value);

    setuserdetail((prev)=> ({
      ...prev,[name]: value
    }));
    
    console.log(userdetail);
    
    
  }

  function handleSignUp(): void {
    if (!userdetail.username) {
      toast.error("Please enter a valid username")
      return;
    }
    if (!emailRegex.test(userdetail.email)) {
      toast.error("Please enter a valid Email address")
      return;
    }
    if (!passwordRegex.test(userdetail.password)) {
      toast.error("Password must be at least 8 characters and must include at least one special characters and one number")
      return;
    }
    toast.success("Form Submited")
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2> Sign Up..</h2>
        <div className={styles.inputContainer}>
          <input 
          value={userdetail.username}
          placeholder="Enter your Username.." type="text" name="username" onChange={handleInputChange} />
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
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  )
}

export default Signup