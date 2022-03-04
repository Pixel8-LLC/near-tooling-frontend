import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className="bg-black text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout