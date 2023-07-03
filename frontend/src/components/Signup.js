import React, { useState }  from 'react'
import { useHistory } from "react-router-dom";
export default function Signup(props) {
    let history=useHistory();
    const [credential, setcredential] = useState({ email: "", password: "" ,name:""});
    const handleSubmit=async(e)=>{
    const data=JSON.stringify({email:credential.email,password:credential.password,name:credential.name});
    console.log(data);
    e.preventDefault();
    const url = "https://inotes-backend-eob5.onrender.com/api/auth/createuser";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });
    const json = await res.json();
    if(json.success){
        // save token andredirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");
        props.alert("successfully Signin","success");
    }else{
        props.alert(json.error,"danger");
    }

    }
    const onChange=(e)=>{
        console.log(credential);
        setcredential({ ...credential, [e.target.name]: e.target.value });
    }
    return (
      <div className='container'style={{ width: "50%" }}>
        <div className="containers my-4" style={{width:"80%"}}>
           <form onSubmit={handleSubmit}>
           <h2>Sign up to Create Account</h2><br></br>
           <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={onChange}
          className="form-control my-1"
          id="name"
          placeholder="Enter Your Name"
          value={credential.name}
          required
        />    
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          onChange={onChange}
          className="form-control my-1"
          id="email"
          placeholder="Enter email"
          value={credential.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.<br></br>
        </small>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={onChange}
          className="form-control my-1"
          id="password"
          placeholder="Password"
          name="password"
          value={credential.password}
          required
          minLength='5'
        />
        <div className='d-flex justify-content-center '>
        <button type="submit" className="btn btn-primary my-3 ">
          Submit
        </button>
        </div>
      </form>
        </div></div>
    )
}

