import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Utilities/Context'
import LogoutModal from '../Components/LogoutModal'

const Navigation = () => {
  const {User, userDetails, fetchUserData, fetchUserDataIntern, fetchUserDataEmployer, userDetailsIntern,  userDetailsEmployer  } = UserContext()
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    if (userDetails?.itOrEm === 'intern') {
      fetchUserDataIntern()
    } else if (userDetails?.itOrEm === 'employer') {
      fetchUserDataEmployer()
      console.log('an Employer')
    }  
  }, [User]);

  const navToSettings = () => {
    fetchUserData();
    if (userDetails?.itOrEm === 'intern') {
      navigate('/SettingpageIntern')
      console.log('intern')
    } else if (userDetails?.itOrEm === 'employer') {
      navigate('/SettingsPage')
      console.log('an Employer')
    }  
  }

  function handleNavigatePostJobs() {
    if (userDetails?.itOrEm === 'intern') {
      alert('cannot post jobs as an intern')
      console.log('cannot post jobs as an intern')
    } else if (userDetails?.itOrEm === 'employer') {
      navigate('/PostJobs');
    }  
  } function handleNavigateDashBoard(event) {
    event.preventDefault();
    if (userDetails?.itOrEm === 'intern') {
      alert('Interns dont have dashboards')
      console.log('Interns dont have dashboards')
    } else if (userDetails?.itOrEm === 'employer') {
      console.log('wth')
      navigate('/Dashboard');
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
            <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <Link to={'/Home'}><li><a>Home</a></li></Link>
              {/* <Link to={'/PostJobs'}><li><a>Post jobs</a></li></Link> */}
              <li onClick={handleNavigatePostJobs}><a>Post jobs</a></li>
              <Link to={'/ProfilePage'}><li><a>Profile</a></li></Link>
              <Link to={'/Internships'}><li> <a>Internships</a></li></Link>
              <Link to={'/Dashboard'} onClick={handleNavigateDashBoard}><li><a>Dashboard</a></li></Link>

      </ul>
        
    </div>
   <Link to={'/Home'}><a className="btn btn-ghost text-xl text-white">BoredIntern</a></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-white">
    <Link to={'/Home'}><li><a>Home</a></li></Link>
              {/* <Link to={'/PostJobs'}><li><a>Post jobs</a></li></Link> */}
              <li onClick={handleNavigatePostJobs}><a>Post jobs</a></li>
              <Link to={'/ProfilePage'}><li><a>Profile</a></li></Link>
              <Link to={'/Internships'}><li><a>Internships</a></li></Link>
              <Link to={'/Dashboard'} onClick={handleNavigateDashBoard}><li><a>Dashboard</a></li></Link>

              
    </ul>
        </div>
        
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
              {/* <img src={userDetailsIntern?.ProfilePicture || userDetailsEmployer?.profileImg} /> */}
              {userDetailsIntern?.ProfilePicture  ?
                  <img src={userDetailsIntern?.ProfilePicture} />
                  : userDetailsEmployer?.profileImg ?
                    <img src={userDetailsEmployer?.profileImg} />
                : <img src="./icons8-user-24 (1).png"/> }
              {/* <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li> <a className="justify-between">Profile<span className="badge">New</span> </a>  </li>
            <Link onClick={handleNavigateDashBoard}><li><a>Dashboard</a></li></Link>
            {/* <li><a>Saved Jobs</a></li> */}
           
        <li><a>Saved Jobs</a></li>
        <li onClick={navToSettings}><a>Settings</a></li>
        <LogoutModal />
      </ul>
    </div>
</div>
      </div>
  )
}

export default Navigation