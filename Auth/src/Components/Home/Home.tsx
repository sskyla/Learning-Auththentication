
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

interface User  {
  username:string,
  email:string
}
const Home = () => {

  const [Show,setShow]=useState(false)
  const navigate = useNavigate();

  const [user, setuser] = useState<User | null>(null)

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user`,
        {
          headers : {Authorization :`Bearer ${localStorage.getItem("token")}`},
        }
      );
      // console.log(response);

      setuser(response.data.user)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getUser();
  },[])

  
  return (
    <div className={styles.container}>
     {user && (<nav>
        <span>
          Hello {user.username}
        </span>
        <button 
        onClick={()=>{localStorage.clear(); 
        navigate("/")
        toast.success("User Logged out")
        }} className={styles.logoutBtn}>Logout</button>
      </nav>)}
      
      {user && (<div className={styles.mainContainer}>
        <div>
          User detail
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
        </div>
        <div className={styles.editContainer}>
          Update User
          <div>
          <input placeholder="Update User" type="text" />
          <button className={styles.edit}>EDIT</button>
          </div>
          <div>
          <input placeholder="Update Email" type="text" />
          <button className={styles.edit}>EDIT</button>
          </div>
          <div className={styles.passwordEdit}>
          <div className={styles.passwordContainer}>
          <input placeholder="Update Password" type={Show? "text" : "password"} name="password" />
          <button onClick={()=>{
            setShow(!Show)
          }}>{Show ? "Hide" : "Show"}</button>
          </div>
          <button className={styles.edit}>EDIT</button>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default Home