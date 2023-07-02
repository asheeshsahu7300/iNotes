import "./App.css";
import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from './components/Alert';
function App() {
//alert 
  const [mode, setMode] = useState('light');
  const [alert,setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },2000)

}


  return (
    <div className="contanier">
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Switch>
            <Route exact path="/" >
              <Home alert={showAlert}/>
            </Route>
            <Route exact path="/about" >
              <About alert={showAlert}/>
            </Route>
            <Route exact path="/login" >
              <Login alert={showAlert}/>
            </Route>
            <Route exact path="/signup">
              <Signup alert={showAlert}/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </div>
  );
}
export default App;
