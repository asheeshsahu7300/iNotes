import React, { useContext } from "react";
import Notes from "./Notes";



export default function Home(props) {
  

  return (
    <div>

        <Notes alert={props.alert}/>
      
    </div>
  );
}
