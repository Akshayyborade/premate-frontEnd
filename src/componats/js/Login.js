// Login.js
import React from 'react';
import "../css/login.css"

const Login = ({loginType}) => {
    // Implement your Login component
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic based on loginType
        switch (loginType) {
          case 'teacher':
            // Implement Teacher login logic
            console.log('Teacher login logic');
            break;
          case 'student':
            // Implement Student login logic
            console.log('Student login logic');
            break;
          case 'admin':
            // Implement Admin login logic
            console.log('Admin login logic');
            break;
          default:
            // Handle default case or show an error
            console.error('Invalid login type');
        }
      };
    return (
       

        <div className="Login">
            <div class="login">
                <form onSubmit={handleSubmit} method="post">
                    <div class="imgcontainer">
                        <img src="img\teacher.png" alt="Avatar" class="avatar" />
                        <p>Teacher Login</p>
                    </div>

                    <div class="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />
                    </div>
                    <div class="bttn">
                        <button type="submit">Login</button>
                        <label>
                            <input type="checkbox" checked="checked" name="remember" /> Remember me
                        </label>
                    </div>


                    <div class="container1" >

                        <span class="psw">Forgot <a href="#">password?</a></span>
                        <span class="signup">Don't have account <a href="registration.html">Sign Up</a></span>
                    </div>
                </form>
            </div>

        </div >

    );
};

export default Login;
