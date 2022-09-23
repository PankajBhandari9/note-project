import React from 'react'

const ItemList = ({ inputList, deleteNoteId, updateNoteItem }) => {
  // console.log(inputList);
  return (
    <div className='list-group'>
      {
        inputList.map((item) => {
          return (
            <li key={item.id} className="list-group-item d-flex justify-content-between bg-light m-2 shadow">
              <div>
                {item.name}
              </div>
              <div>
              <button className='mx-3 btn btn-outline-danger' onClick={() => deleteNoteId(item.id)} >Delete</button>
              <button className='mx-3 btn btn-warning' onClick={() => updateNoteItem(item)} >Update</button>
              </div>
            </li>
          )
        })
      }
    </div>
  )
}

export default React.memo(ItemList);