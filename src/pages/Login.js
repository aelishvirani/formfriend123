import React,{useState,useEffect} from 'react'
import './Register.css';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
const Login = () => {
  const [user, setuser] = useState({
    Email: "",
    Password  : "",
  });
const [login,setLogin] = useState(false);
  const handlechange = (e) => {
    console.log(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  var navigate = useNavigate();
const handleSubmit = async ()=>{
  var stringify = JSON.stringify(user);
  console.log(stringify);

  const res = await fetch("http://formfriend.cleverapps.io/api/Auth/SignIn", {
    method: "POST",
    mode: "cors",
    headers: { "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",},
    body: stringify,
  });
    var status = await res.json();
    console.log(status);
      if (res.status === 200) {
        console.log(res);
        const date = new Date(status.Valid);
        Cookies.set("token", status.User, { expires: date });
        navigate("/dashboard");
      } else {
        console.log(res);
      }
    
}
  return (
    <div className='register'>
      <header className="register-header" >
        <h1>FORM FRIENDLY !!</h1>
      </header>
      <div className='First1'>
        <body>
          <form  >
          <h1>Login</h1>
          <hr/>
          
          <label for="username"><b>Username</b></label>
          <input onChange={handlechange} type="text" className='boxforinput' placeholder="Enter Your Username" value={user.Email}name="Email" required />
          <br/>

          <label for="pwd"><b>Password</b></label>
          <input type="password" className='boxforinput' placeholder="Enter Your Password" value={user.Password}
                onChange={handlechange} name="Password" required /><br/>
    
          <button onClick={handleSubmit} type="button" class="submitbutton">Sign in</button>
        
          <Link to='/Registration'><p>New to form friend? Register</p></Link>
        
          </form>
        </body>
      </div>
    </div>
  )
}

export default Login