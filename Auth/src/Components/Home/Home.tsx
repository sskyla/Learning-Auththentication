
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import toast from "react-hot-toast";
import { useState } from "react";
const Home = () => {

  const [Show,setShow]=useState(false)
  const navigate = useNavigate();

  
  return (
    <div className={styles.container}>
      <nav>
        <span>
          Hello User
        </span>
        <button 
        onClick={()=>{localStorage.clear(); 
        navigate("/")
        toast.success("User Logged out")
        }} className={styles.logoutBtn}>Logout</button>
      </nav>
      
      <div className={styles.mainContainer}>
        <div>
          User detail
          <p>Username : user</p>
          <p>Email : email</p>
        </div>
        <div className={styles.editContainer}>
          Update User
          <input placeholder="Update User" type="text" />
          <input placeholder="Update Email" type="text" />
          <div className={styles.passwordContainer}>
          <input placeholder="Update Password" type={Show? "text" : "password"} name="password" />
          <button onClick={()=>{
            setShow(!Show)
          }}>{Show ? "Hide" : "Show"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home