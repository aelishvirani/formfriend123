import React from 'react'
import {Link} from 'react-router-dom'
import './Register.css';

const Register = () => {
  return (
    <div className='register'>
      <header className="register-header" >
        <h1>FORM FRIENDLY !!</h1>
      </header>
      <div className='First1'>
        <body>
          <form action="action.php">
          <h1>Register</h1>
          <hr/>
        
          <label for="name"><b>Name</b></label>
          <input type="text" className='boxforinput' placeholder="Enter Your Name" name="name" required />
          <br/>
        
          <label for="email"><b>Email</b></label> 
          <input type="text" className='boxforinput' placeholder="Enter Your E-mail" name="email" required /><br/>
    
          <label for="username"><b>Username</b></label>
          <input type="text" className='boxforinput' placeholder="Enter Username" name="username" required />
          <br/>

          <label for="pwd"><b>Password</b></label>
          <input type="password" className='boxforinput' placeholder="Enter Your Password" name="psw" required /><br/>
    
          <label for="psw-repeat"><b>Re-enter Password</b></label>
          <input type="password" className='boxforinput' placeholder="Re-enter Your Password" name="psw-repeat" required /><br/>
          <hr/>
    
          <Link to='/login'><button type="submit" className='submitbutton'>Register</button></Link>
        
          <Link to='/login'><p>Already have an account? Sign in.</p></Link>
        
          </form>
        </body>
      </div>
    </div>
  )
}

export default Register