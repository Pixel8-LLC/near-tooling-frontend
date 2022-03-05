import React from 'react'
import logo from '../../assets/img/logo.png'

const Header = () => {
  return (
    <div className="flex items-center py-10 space-x-5 w-full">
      <div className="">
        <img src={logo} alt="Logo" />
      </div>
      <div className="w-px h-6 bg-white"></div>
      <div className="">Tooling</div>
      <div className="flex-1"></div>
      <button className="bg-white text-black rounded-lg px-4 py-1">Connect Wallet</button>
    </div>
  );
}

export default Header