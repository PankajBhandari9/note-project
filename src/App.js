import React from 'react'
import Note from './Components/Note';
import SearchList from './Components/SearchList';
import { Route, Routes, NavLink } from 'react-router-dom';
import './App.css'

function App() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg bg-light '>
                <div className='container-fluid'>
                    <NavLink className="navbar-brand" to='/' >Navbar</NavLink>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/home' className="nav-link" aria-current="page"
                                    style={({ isActive }) => { return { className: isActive ? "active" : "" } }}
                                >
                                    Take Note
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='search' className="nav-link"
                                    style={({ isActive }) => { return { className: isActive ? "active" : "" } }}
                                >
                                    Search Note
                                </NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

            <Routes>

                <Route path='/home' element={<Note />} />
                <Route path='/search' element={<SearchList />} />

            </Routes>
        </div>
    )
}

export default App;