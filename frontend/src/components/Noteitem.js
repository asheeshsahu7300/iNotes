import React, {useContext}from 'react'
import NoteContext from "../context/notes/NoteContext";

export default function Noteitem(props){
    
    const {note}=props;
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {updateNote}=props
    return (
        <>
     <div className="col-md-4">
        <div className="solution_cards_box">
          <div className="solution_card">
            <div className="hover_color_bubble"></div>
            <div className="so_top_icon">
            </div>
            <div className="solu_title">
            <h3>{note.title}</h3>
              
            </div>
            
            <div className="solu_description my-2">
              <p style={{overflowY:"auto",maxHeight:'23vh',minHeight:"10vh"}}>
               {note.description}
              </p>
              {note.tag!="" &&
            <h5 style={{backgroundColor:'#309df0' ,borderRadius:'10px' ,padding:"4px",color:"white",display:"inline",marginTop:"20px"} }>{note.tag}</h5>}
              <i className="fas fa-trash mx-3" onClick={()=>{deleteNote(note._id);
            props.alert("successfully Deleted","success");}
              }></i>
              <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
             
              </div>
          </div>
          
      </div>
    </div>
        </>
    );
}
