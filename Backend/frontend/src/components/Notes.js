import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useHistory } from 'react-router';

const Notes = (props) => {
    let  history=useHistory();
    const context = useContext(NoteContext);
    const { notes, fetchNotes, editNote} = context;
    useEffect(() => {
        if(localStorage.getItem('token'))fetchNotes();
        else  history.push('/login');
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", estatus: ""})
    const updateNote = (currentNote) => {
        ref.current.click();
        console.log(currentNote);
        setNote({id:currentNote._id,etitle: currentNote.title,edescription: currentNote.description, estatus:currentNote.status})
    }
    const handleClick = ()=>{
        editNote(note.id, note.etitle, note.edescription, note.estatus)
        refClose.current.click();
    }

    const onChange = (e)=>{
        console.log(e.target.name,e.target.value);
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="estatus" className="form-label">status</label>
                                    {/* <input type="text" className="form-control" id="estatus" name="estatus" value={note.estatus} onChange={onChange} /> */}
                                    <select id="estatus" onChange={onChange} name="estatus">
                                    <option value="active">Active</option>
                                    <option value="completed">completed</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-3 row my-3 " >
                <h2>You Notes</h2>
                <div className=" mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                <div >
                <div className="row">
                    {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} alert={props.alert}/>
                })}
                </div>
                </div>
                
            </div>
            <div id='footer' style={{width:'100%',height:"50px"}}></div>
        </>
    )
}

export default Notes