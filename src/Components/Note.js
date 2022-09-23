import React, { useEffect, useRef, useState } from 'react'
import ItemList from './ItemList';

const Note = () => {

    // getting the inputNote
    const [inputNote, setInputNote] = useState('');
    // gettin the inputNote into the inputList
    const [inputList, setInputList] = useState([]);
    // on the basis of update change the view
    const [isEdit, setIsEdit] = useState(false);
    // act as the global variable that will get the update value and we can compair it with any thing in the functional component
    const gettingNote = useRef(null);

    // getting the data once after fresh reload
    useEffect(() => {
        let list = localStorage.getItem('list');
        if (list) setInputList(JSON.parse(list));
    }, [])

    // setting the data into localstorage on the basis of list change
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(inputList));
    }, [inputList])



    function addToInputList() {

        // if isEdit is true then iterate through list and find that item which is updated
        // and set it other wise just send the whole object(name, id) into list.
        if (isEdit) {
            const newList = inputList.map((item) => {
                if (item === gettingNote.current) {
                    return { name: inputNote, id: item.id };
                }
                else {
                    return item;
                }
            })

            // the new list into the orignal list
            setInputList(newList);
            // set into local storage
            localStorage.setItem('list', JSON.stringify(inputList));
            // set isEdit to false so that add Note will be shown
            setIsEdit(false);
            // empty the input box.
            setInputNote('');

        } else {
            // if isEdit is false then just destructure the list and add one ore to the inputList
            setInputList([...inputList, { name: inputNote, id: new Date() }]);

            // again set to the local storage.
            localStorage.setItem('list', JSON.stringify(inputList));

            // empty the input box
            setInputNote('');

        }
    }

    function deleteNote(id) {
        // getting the id and filter that object from the input list.
        const newInputList = inputList.filter((item) => {
            return item.id !== id;
        })
        // update the input list
        setInputList(newInputList);
        // set the list agian into local storage
        localStorage.setItem('list', JSON.stringify(inputList));
    }

    function updateNote(userDetails) {
        // getting the whole object from the button click
        // set isEdit to true to change the view into update 
        setIsEdit(true);
        // getting the object to the ref variable 
        gettingNote.current = userDetails;
        // update the inputBox of updatenote so that user know what he/she is updating
        setInputNote(gettingNote.current.name);
    }


    return (
        <div className='container'>

            {
                isEdit ?

                    <div className='my-4'>
                        <div>
                            <label className='form-label' htmlFor="updateNote">Update Note</label>
                            <input className="form-control"
                                id="updateNote"
                                type="text" value={inputNote}
                                onChange={(e) => setInputNote(e.target.value)}
                            />
                        </div>

                        <div className="d-grid my-3">
                            <button
                                className='btn btn-outline-primary '
                                onClick={addToInputList}>Update Note</button>
                        </div>
                    </div>
                    :

                    <div className='my-4'>
                        <div>
                            <label className='form-label' htmlFor="addNote">Add Note</label>
                            <input
                                className='form-control'
                                id="addNote"
                                type="text"
                                value={inputNote}
                                onChange={(e) => setInputNote(e.target.value)} />
                        </div>
                        <div className="d-grid  my-3">
                            <button
                                className='btn btn-outline-success'
                                onClick={addToInputList}>Add Node</button>
                        </div>

                        <ItemList inputList={inputList} deleteNoteId={deleteNote} updateNoteItem={updateNote} />
                    </div>

            }
        </div>
    )
}

export default Note;