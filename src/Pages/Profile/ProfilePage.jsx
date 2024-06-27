import React from 'react'
import { useEffect } from 'react'
import { UserContext } from '../../Utilities/Context'
import Navigation from '../Navigation'

const ProfilePage = () => {
  const { User, userDetails, fetchUserData, fetchUserDataIntern, fetchUserDataEmployer, userDetailsIntern,  userDetailsEmployer } = UserContext()
  useEffect(() => {
    fetchUserData();
    if (userDetails?.itOrEm === 'intern') {
      fetchUserDataIntern()
    } else if (userDetails?.itOrEm === 'employer') {
      fetchUserDataEmployer()
    }  
  }, [User]);
  
 
  // console.log(fetchUserDataIntern())
  return (
    <div>
      <Navigation />
      <div className='p-4'> 
      <div className='flex justify-around flex-wrap'>
      <div className='flex flex-col border rounded w-full lg:w-3/5  bg-blue-100 p-4'>
        <div className="avatar">
  <div className="w-24 rounded-full">
    <img src={userDetailsIntern?.ProfilePicture || userDetailsEmployer?.profileImg} />
    {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
  </div>
        </div>
        <span className='text-3xl'>{userDetailsIntern?.FirstName || userDetailsEmployer?.FirstName} {userDetailsIntern?.LastName || userDetailsEmployer?.LastName}</span>
          <p className='text-xl'>{userDetailsIntern?.Bio || userDetailsEmployer?.Bio}</p>
          <p className='cursor-pointer' onClick={()=>document.getElementById('my_modal_5').showModal()}>contact info</p>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        
        <p>Lagos state, Nigeria</p>
        <span className='font-bold text-lg'>About</span> 
        <p className=''> {userDetailsIntern?.About || userDetailsEmployer?.About}</p>
       
            
            <span className='font-bold text-lg'>Skills</span>
            {userDetailsEmployer?.skillsList.map((items) => {
        return <p>{items}</p>
      })} || {userDetailsIntern?.skillsList.map((items) => {
         return <p>{items}</p>
       })}  
            

        <div>
          <span className='font-bold text-lg'>Social links</span>
              <p>www.arokoyuolaniyi.com</p>
              <p>{userDetailsIntern?.Email || userDetailsEmployer?.Email}</p>
        </div>
      </div>

      <div className=' bg-blue-100 p-4 w-full lg:w-1/4 mt-4 rounded'>
        <div>
          <span className='font-bold text-lg'>Language</span>
          <p>English</p>
          </div>
          
        <div className='mt-5'>
          <span className='font-bold text-lg'>External Links</span>
          <p>www.olaniyi.com</p>
          <p>saiyan6190@github.com</p>
        </div>
        </div>
        </div>
      </div>
      </div>
  )
}

export default ProfilePage