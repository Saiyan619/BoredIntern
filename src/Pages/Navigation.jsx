import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Utilities/Context'
import LogoutModal from '../Components/LogoutModal'

const Navigation = () => {
  const { logOut } = UserContext()
  const navigate = useNavigate();

  const logOutUser = async() => {
    try {
        await logOut()
        navigate('/')
        console.log('logged out')
    } catch (error) {
        console.log(error)
    }
}

  return (
      <div>
          <div className="navbar flex justify-between bg-primary ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            
              <Link to={'/Home'}><li><a>Home</a></li></Link>
              <Link to={'/PostJobs'}><li><a>Post jobs</a></li></Link>
              <Link to={'/ProfilePage'}><li><a>Profile</a></li></Link>
              <Link to={'/Internships'}><li> <a>Internships</a></li></Link>
      </ul>
    </div>
   <Link to={'/Home'}><a className="btn btn-ghost text-xl">BoredIntern</a></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <Link to={'/Home'}><li><a>Home</a></li></Link>
              <Link to={'/PostJobs'}><li><a>Post jobs</a></li></Link>
              <Link to={'/ProfilePage'}><li><a>Profile</a></li></Link>
              <Link to={'/Internships'}><li> <a>Internships</a></li></Link>
              
    </ul>
        </div>
        
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
            {/* <li><a>Saved Jobs</a></li> */}
           
        <li><a>Saved Jobs</a></li>
        <Link to={'/SettingsPage'}><li><a>Settings</a></li></Link>
        <LogoutModal />
      </ul>
    </div>
</div>
      </div>
  )
}

export default Navigation