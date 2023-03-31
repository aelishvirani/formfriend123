import React from 'react'
import './Register.css';
import { Link } from 'react-router-dom';

const login = () => {
  return (
    <div className='register'>
      <header className="register-header" >
        <h1>FORM FRIENDLY !!</h1>
      </header>
      <div className='First1'>
        <body>
          <form action="action.php">
          <h1>Login</h1>
          <hr/>
          
          <label for="username"><b>Username</b></label>
          <input type="text" className='boxforinput' placeholder="Enter Your Username" name="username" required />
          <br/>

          <label for="pwd"><b>Password</b></label>
          <input type="password" className='boxforinput' placeholder="Enter Your Password" name="psw" required /><br/>
    
          <Link to='/app'><button type="submit" class="submitbutton">Sign in</button></Link>
        
          <Link to='/Registration'><p>New to form friend? Register</p></Link>
        
          </form>
        </body>
      </div>
    </div>
  )
}

export default login