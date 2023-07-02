import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login(props) {
    let history=useHistory();
  const [credential, setcredential] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
    console.log(credential);
  };

  const handleSubmit = async (e) => {
     const data=JSON.stringify({email:credential.email,password:credential.password});
     console.log(data);
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });
    const json = await res.json();
    console.log(json);
    if(json.success){
        // save token andredirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");
        props.alert("successfully Login","success");
    }else{
        props.alert(json.error,"danger");
    }
  };
  return (
    <>
   <div className='container'>
    <div className="container my-4" style={{ width: "50%" }}>
     <h2>Login And Store Unlimited Notes</h2>
      <form onSubmit={handleSubmit}>
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
        <small id="emailHelp" className="form-text text-muted d-block">
          We'll never share your email with anyone else.
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
        />
        <div className='d-flex justify-content-center '>
        <button type="submit" className="btn btn-primary my-3 ">
          Login
        </button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}
