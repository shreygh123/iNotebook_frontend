import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  // const host = "http://localhost:5000"
  const host = "https://i-notebook-backend-l06pv99ct-shreyash-ghuges-projects.vercel.app"
  const initialNotes = []
  const [notes, setnotes] = useState(initialNotes);

  // GET ALL NOTES
  const getnotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      redentials: "include",
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json()
    setnotes(notes.concat(note))
  }

  //DELETE NOTES
  const deleteNote = async (id) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
    }
  });
    const json = await response.json()
    console.log(json)


    console.log("Deleting the note with id" + id);
    const newnotes = notes.filter((note) => { return note._id !== id })
    setnotes(newnotes)
  }
  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      });
    const json = response.json();
    console.log(json);

    let newnotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag
        break;
      }
    }
    setnotes(newnotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getnotes }}>
      {props.children}

    </NoteContext.Provider>
  )
}

export default NoteState;
