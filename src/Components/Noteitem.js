import React, { useContext } from 'react';
import noteContext from '../Context/Notes/noteContext';
import './cssfiles.css'

const Noteitem = (props) => {
    const a = useContext(noteContext)
    const { deleteNote } = a;
    const { notes, updatenote } = props;

    let date = notes.date;
    date = date.slice(0, -14).split('-').reverse().join('-');


    return (
        <div className=" col-md-3 my-3 ">
           
            <div className="card cardi">

                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger overwr">
                <i className="fas fa-trash mx-2 my-1" onClick={() => { deleteNote(notes._id); props.showAlert("Deleted successfully", "success");}}></i>
                <i className="fas fa-edit mx-2 my-1" onClick={() => { return updatenote(notes) }}></i>
            </span>
                <div className="card-body ">
                    <div className="d-flex align-items-center ">

                        <h5 className="card-title">{notes.title}</h5>

                    </div>
                    <p><b>{notes.tag}</b></p>
                    <p className="card-text">{notes.description}</p>
                    <p className='text-secondary small text-end '>
                        <small>{date} </small>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Noteitem;
