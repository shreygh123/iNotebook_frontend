import React, { useContext, useEffect, useState, useRef } from 'react';
import Noteitem from './Noteitem';
import noteContext from '../Context/Notes/noteContext';
import { useNavigate } from 'react-router-dom'
// import AddNote from './Addnote';

const Note = (props) => {
  const navigate = useNavigate();
  const a = useContext(noteContext)
  const { notes, getnotes, editNote } = a;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes()
      // eslint-disable-next-line
    }
    else {
      navigate("/login");
    }
  }, [getnotes, navigate])

  const ref = useRef(null);
  const closeref = useRef(null);
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
  const handleClick = (e) => {
    e.preventDefault();
    props.showAlert("Updated successfully", "success");
    editNote(note.id, note.etitle, note.edescription, note.etag)
    closeref.current.click();
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

  }
  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />      </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" onChange={onChange} id="edescription" value={note.edescription} name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tags</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.etag} id="etag" name="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className='container mb-5'>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} notes={note} updatenote={updatenote} showAlert={props.showAlert} />
        })}
      </div>

    </>
  )
}

export default Note
