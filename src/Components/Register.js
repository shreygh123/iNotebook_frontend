import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  
  const {name,email,password,cpassword}=credentials;
  const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClick = async(e) => {
      
        e.preventDefault();
            // API Call 
            const response = await fetch("https://i-notebook-backend-l06pv99ct-shreyash-ghuges-projects.vercel.app/api/auth/createUser", {
            // const response = await fetch("http://localhost:5000/api/auth/createUser", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' ,
                "auth-token": localStorage.getItem("token")
                       },
              body: JSON.stringify({ name,email,password })
            });
            const json = await response.json()
            console.log(json);

            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                props.showAlert("Account created Sucessfully" , "success")
                navigate("/");
            }
            else{
              props.showAlert("Invalid Details" , "danger")
            }

          }
      
  return (
    <div className='my-3'>
      <div className='text-center'>
                <h1>iNOTEBOOK</h1>
                <p><b>Your notes on cloud ☁️</b></p>
            </div>
      <form onSubmit={handleClick}>
      <p className="text-center my-3"><i>New to iNotebook? 👉🏻Create a new account here! </i></p>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} name="name" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={email}  onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={password}  onChange={onChange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' value={cpassword}  onChange={onChange} id="cpassword" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>
                <p className='text-center last-para'>Already have an account? <a href="/login">Login-&gt;</a> </p>    
      </form>
    </div>
  )
}

export default Register;
