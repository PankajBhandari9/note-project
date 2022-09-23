import React, { useEffect, useState } from 'react'

const SearchList = () => {

  // cotains the list that will be interative
  const [inputList, setInputList] = useState([]);
  // getting the value from the input box.
  const [searchInput, setSearchInput] = useState("");

  // contains the orignal list
  const [orgList, setOrgList] = useState([]);

  // On the basis of searchInput value will be show, nothing in there then transfer the orgnList
  // otherwise just filter the value that is required.
  useEffect(() => {
    if (searchInput === "") {
      setInputList(orgList);
    } else if (inputList.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))) {

      const newList = inputList.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));

      setInputList(newList)
    }
  }, [searchInput])


  // on the fresh search, everything will be in the list.
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem('list'));
    if (list) {
      setInputList(list)
      setOrgList(list);
    };
  }, [])


  return (
    <div className='container'>

      <div className='my-4'>
        <label htmlFor="search" className='form-label'>Search Notes</label>
        <input id="search"
          className="form-control"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />
      </div>

      <ul className='list-group'>
        {
          inputList.map((item) => {
            return (
              <li className='list-group-item bg-light m-2 p-3 shadow' key={item.id}>{item.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SearchList;