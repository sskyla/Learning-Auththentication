
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import toast from "react-hot-toast";
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { emailRegex } from "../Utility/RegEx";
import Loader from "../Loader/loader";

interface User  {
  username:string,
  email:string
}
const Home = () => {

  const [Show,setShow]=useState(false)
  const navigate = useNavigate();

  const [newuserData, setnewuserData] = useState({
    username:"",
    email:"",
    password:""
  })

  const [user, setuser] = useState<User | null>(null)
  const [isEdit, setisEdit] = useState({
    username: false,
    email: false,
    password: false
  })

  const [isLoading, setisLoading] = useState(false)

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

  
  function handleChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
    const {name,value}= event.target;
    setnewuserData((prev)=>({
      ...prev,
      [name]: value
    }));
  }

  const updateUserData = async (type:string)=> {
    if (!emailRegex.test(newuserData.email) && type === "email") {
      toast.error("Please enter a valid Email address")
      return;
    }
    if (!newuserData.password && type ==="password") {
      toast.error("Please enter your password");
      return;
    }

    if (!newuserData.username && type ==="username") {
      toast.error("Please enter a valid username");
      return;
    }
    
    try {
      setisLoading(true)
      const response = await axios.put(`${import.meta.env.VITE_BASE_SERVER_URL}/user/updateuser`,{type,newuserData},
        {
          headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
      )
      toast.success(response.data.message)
      setisEdit({email:false,password:false,username:false})
      setnewuserData({email:"",password:"",username:""})
      getUser()
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
      console.log(error);
    }
  }

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
        <div className={styles.user}>
          User detail
          <p>Username : {user.username}</p>
          <p>Email : {user.email}</p>
        </div>
        <div className={styles.editContainer}>
          Update User
          <div>
          <input
          name="username" value={newuserData.username} onChange={handleChange}
          disabled={!isEdit.username} placeholder="Update Username " type="text" />
          <button onClick={()=>{
            setisEdit((prev)=>({
              ...prev,
              username:true
            }))
          }} className={styles.edit}>EDIT</button>
          {isEdit.username && (<div className={styles.button}>
            {isLoading ? <Loader/>:<>
            <button onClick={()=>{updateUserData("username")}}>Save</button>
            <button onClick={()=>{
              setisEdit((prev)=>({
                ...prev,
                username:false
              }));
              setnewuserData((prev)=>({
                ...prev,
                username:""
              }))
            }} >Cancle</button>
            </>}
          </div>)}
          </div>
          <div>
          <input 
          name="email" value={newuserData.email} onChange={handleChange}
          disabled={!isEdit.email} placeholder="Update Email" type="text" />
          <button onClick={()=>{
            setisEdit((prev)=>({
              ...prev,
              email:true
            }))
          }} className={styles.edit}>EDIT
          </button>
          {isEdit.email && (<div className={styles.button}>
            {isLoading ? <Loader/>:<>
            <button onClick={()=>{updateUserData("email")}}>Save</button>
            <button onClick={()=>{
              setisEdit((prev)=>({
                ...prev,
                email:false
              }));
              setnewuserData((prev)=>({
                ...prev,
                email:""
              }))
            }}>Cancle</button>
            </>}
          </div>)}
          </div>
          <div className={styles.passwordEdit}>
          <div className={styles.passwordContainer}>
          <input name="password" value={newuserData.password} onChange={handleChange} disabled={!isEdit.password} placeholder="Update Password" type={Show? "text" : "password"} />
          <button onClick={()=>{
            setShow(!Show)
          }}>{Show ? "Hide" : "Show"}</button>
          </div>
          <button onClick={()=>{
            setisEdit((prev)=>({
              ...prev,
              password:true
            }))
          }} className={styles.edit}>EDIT
          </button>
          </div>
          {isEdit.password &&(<div className={styles.button}>
            {isLoading ? <Loader/>:<>
            <button onClick={()=>{updateUserData("password")}}>Save</button>
            <button onClick={()=>{
              setisEdit((prev)=>({
                ...prev,
                password:false
              }));
              setnewuserData((prev)=>({
                ...prev,
                password:""
              }))
            }}>Cancle</button>
            </>}
          </div>)}
        </div>
      </div>)}
    </div>
  )
}

export default Home