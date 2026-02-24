import React from 'react'
import { FileQuestion, LayoutDashboardIcon, SparklesIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { UserButton } from '@clerk/clerk-react'

function Navbar() {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  

  return (
    <nav className="bg-base-100/50 backdrop-blur-md border-b border-base-100/80 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link
            className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'
          >
            <div className='size-10 rounded-xl bg-linear-to-br from-primary-content to-accent-content flex items-center justify-center shadow-lg border border-gray-200'>
              <SparklesIcon className='size-6 text-white' />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider ">
                AI Interview
              </span>
              <span className="text-xs text-black font-semibold">Code Together</span>
            </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link 
            to='/problems'
            className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${ isActive("/problems") ? "bg-base-300 " : "hover:bg-neutral-content text-base-content/70 hover:text-base-content" }`}
          >
            <div className="flex items-center gap-x-2.5">
              <FileQuestion className='size-4 ' strokeWidth='2' />
              <span className=" hidden sm:inline text-center text-sm">Problems</span>
            </div>
          </Link>
          <Link 
            to='/dashboard'
            className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${ isActive("/dashboard") ? "bg-base-300" : " hover:bg-neutral-content text-base-content/70 hover:text-base-content" }`}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className='size-4 ' strokeWidth='2' />
              <span className="hidden sm:inline text-center text-sm">Dashboard</span>
            </div>
          </Link>
          <div className="ml-2">
            <UserButton />
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar