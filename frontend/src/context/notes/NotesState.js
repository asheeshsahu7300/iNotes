
import NoteContext from "./NoteContext";
import {useState} from 'react';
const NoteState=(props)=>{
      const host='http://localhost:5000/';
       const initialstate=[];
       const [notes,setnotes] = useState(initialstate)
     
      //fetch all notes
      const fetchNotes=async()=>{
        //add in databse
       const url=`${host}api/notes/fetchallnotes`;
       console.log(url);
       const res=await fetch(url,{method:"GET",
       headers:{
         "Content-Type":'application-json',
         'auth-token':localStorage.getItem('token')
       }}
      );
      const data=await res.json();
      setnotes(data);
      }
      
      const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
    
        const note = await response.json();
        setnotes(notes.concat(note))
      }
    
      //Delete a Note
      const deleteNote=async(id)=>{
        const url=`${host}api/notes/deletenote/${id}`;
        const res=await fetch(url,{method:"DELETE",
        headers:{
          "Content-Type":'application-json',
          'auth-token':localStorage.getItem('token')
        }
        
      });
       const jsondata=await res.json();
      
      


        console.log("deleting node with id="+id);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
      }

      //Edit a Note
      const editNote=async(id,title,description,tag)=>{
        //updating database
        const url=`${host}api/notes/updatenote/${id}`;
        const res=await fetch(url,{method:"PUT",
        headers:{
          "Content-Type":'application/json',
          'auth-token':localStorage.getItem('token')
        }
        ,
        body:JSON.stringify({title,description,tag}),
      });
       const json=res.json();
       //updating clint side
       let newnotes=[];
        for (let index = 0; index < notes.length; index++) {
          newnotes[index]=notes[index];
          if(notes[index]._id===id){
            const element=notes[index];
            element.title=title;
            element.tag=tag;
            element.description=description;
            newnotes[index]=element;
          }
         
        }
        setnotes(newnotes);
      }

    //to logout
    const logOut=()=>{
      localStorage.removeItem('token');
     
      
      }

    return (
        <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,editNote,fetchNotes,logOut}}>
            {props.children}
        </NoteContext.Provider>
    )
    }

export default NoteState;