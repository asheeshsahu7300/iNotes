import "./navbar.css"
import React,{useContext} from 'react'
import { Link ,useLocation} from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import { useHistory } from "react-router-dom";
export default function Navbar() {
  const history=useHistory();
  let location = useLocation();
  const context = useContext(NoteContext);
  const {logOut}=context;
  const loggingOut=()=>{
    logOut();
    history.push('/login');
  }
    return (
     
        <div>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand"  to="/">iNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''} `} aria-current="page" to="/About">  About Us</Link>
        </li>
       
      </ul>
      {
      !localStorage.getItem('token') && <form className="d-flex">
       <Link className="btn btn-primary mx-1" role='button' to='/login'>Sign in</Link>
       <Link className="btn btn-primary mx-1" role='button' to='/signup'>Sign up</Link>
      </form>

      
    }{
      localStorage.getItem('token') && <div className="d-flex align-items-center">
      <span className="text-light me-2">Welcome,{" Asheesh"}</span>
      <button className="btn btn-primary " role='button' onClick={loggingOut}>Logout</button></div>
      
    }
    </div>
  </div>
</nav>
        </div>
    )
}
