import React, { useState } from 'react'

export default function AuthForm( props ) {
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username, 
      password
    } 
  } = props

  const [ showPswrd, setShowPswrd ] = useState( true )

  function togglePswrd() {
    setShowPswrd( !showPswrd )
  };
  
  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input 
          type="text" 
          value={ username } 
          name="username" 
          onChange={ handleChange } 
          placeholder="Username"/>
        <input 
          type={ showPswrd ? "password" : 'text' }
          value={ password } 
          name="password" 
          onChange={ handleChange } 
          placeholder="Password"
          id='pswrdToggle'/>
        <button>{ btnText }</button>
        <p style={ { color: "red" } }>{ errMsg }</p>
      </form>
      <input className='' type='checkbox' onClick={ togglePswrd } /> Show Password
    </>
  )
}