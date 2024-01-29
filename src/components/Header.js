import React from 'react'
import logo from '../images/logo.png'
function Header(){
  return (
    <>
      <header className="header">
      <img className="header__logo" id="logo-header" alt="logo header" src={logo}/>
      <hr className="header__line"/>
    </header>
    </>
  )
}

export default Header
