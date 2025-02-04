import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-green-900 text-white py-2">
        <div className="logo">
            <span className=' font-bold text-2xl mx-10'>E - TASKS</span>
        </div>
        <ul className="flex gap-8 mx-12">
            <li className='hover:cursor-pointer hover:underline hover:transition-all hover:font-bold'>Home</li>
            <li className='hover:cursor-pointer hover:underline hover:transition-all hover:font-bold'>Tour Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
