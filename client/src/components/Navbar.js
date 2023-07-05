import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar( props) {
    const { logout } = props
    return (
        <div className='navbar' >
            <Link to='/profile'><button className='navbar-item'>Profile</button></Link>
            <Link to='/'><button className='navbar-item' >Home</button></Link>
            <button className='navbar-item' onClick={ logout }>Logout</button>
        </div>
    )
}