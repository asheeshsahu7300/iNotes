import React, { useContext,useState }  from 'react'
import NoteContext from "../context/notes/NoteContext";

export default function Addnote() {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",status:"active",date:new Date()})
    const handleClick=(e)=>{
        e.preventDefault({title:"",description:"",tag:""});
        addNote(note.title,note.description,note.date,note.status);
        setnote({title:"",description:"",tag:""})
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
        
    }
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

    return (
     <div className="container my-1">
      <h1>Add Todo</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input style={{padding:"15px 20px" }}
            type='text'
            className="form-control"
            id="title"
            placeholder="Title"
            aria-describedby="emailHelp"
            name='title'
            onChange={onchange}
            value={note.title}
            required
            maxLength='30'
          />
        </div>
        <div className="mb-3 form-label">
        <label className="form-label" htmlFor="tag">
           Date
          </label>
          <input style={{padding:"15px 20px" }}
            type="date"
            className="form-control"
            id="date"
            name="date"
            placeholder="Add Date"
            onChange={onchange}
            value={note.date}
            min={year+"-"+month+"-"+day}
          />
        </div>
        <div className="mb-3 " >
          <label htmlFor="desc" className="form-label">
            Description
          </label>
         <input style={{padding:"40px 20px" }}
            type="text"
            name="description"
            padding="20px 20px"
            className="form-control"
            placeholder="Add Your Description"
             height="480px"
            id="description"
            onChange={onchange}
            value={note.description}
          /> 
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5 } onClick={handleClick} className="btn btn-primary">
          Add
        </button>
      </form >
      </div>
    )
}
