import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Login from "./Components/Login/Login"
import Signup from "./Components/Signup/Signup"
import Forgetpass from "./Components/Forgetpass/Forgetpass"
import Home from "./Components/Home/Home"
import Auth from "./Components/Utility/Auth"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forget-password" element={<Forgetpass/>}/>
        <Route element={<Auth/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="*" element={<h1>404 PAGE NOT FOUND</h1>}/>
      </Routes>
    </Router>
  )
}

export default App