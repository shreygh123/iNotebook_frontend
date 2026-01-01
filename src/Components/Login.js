import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom'
import './cssfiles.css';

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
            const response = await fetch("https://i-notebook-backend-l06pv99ct-shreyash-ghuges-projects.vercel.app/api/auth/login", {
            // const response = await fetch("http://localhost:5000/api/auth/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
              },
              body: JSON.stringify({ email:credentials.email ,password:credentials.password }),
              credentials: "include"
            });
            const json = await response.json()
            console.log(json);
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                props.showAlert("Logged in Sucessfully" , "success");
                navigate("/");
            }
            else{
                props.showAlert("Invalid Details" , "danger");
            }
          }
      
      const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }
      
    return (<div className='my-3'>
        <div className='text-center my-4'>
        <div class="loader moveup">
        <span>iNOTEBOOK</span>
    </div>
                {/* <h1 class="loader">iNOTEBOOK</h1> */}
                <p ><b>Your notes on cloud ☁️</b></p>
            </div>
        <form onSubmit={handleClick}>
        <p className="text-center "><i>Login to continue using iNotebook 😊 </i></p>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p className='text-center last-para'>Don't have an account? <a href="/register">Sign Up &gt;</a> </p>

    </div>)
};

export default Login;
