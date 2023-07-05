import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider.js'
import FavShowsList from './FavShowsList.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    favorites,
    getUserShows 
  } = useContext( UserContext )

  // const [inputs, setInputs] = useState(initInputs)
  // const [toggle, setToggle] = useState(false)

  // const { signup, login, errMsg, resetAuthErr } = useContext( UserContext )
  // function handleChange(e){
  //   const { name, value } = e.target
  //   setInputs(prevInputs => ({
  //     ...prevInputs,
  //     [name]: value
  //   }))
  // }

  useEffect( () =>{ 
    getUserShows()
    }, [] )

  return (
    <div className="profile">
      <h1>Welcome Magnanimous {username}!</h1>
      <h3>Your favorited shows</h3>
      <FavShowsList />
    </div>
  )
}