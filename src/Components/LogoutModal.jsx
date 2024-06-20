import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Utilities/Context'


const LogoutModal = () => {
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
          
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <li onClick={()=>document.getElementById('my_modal_5').showModal()}><a>Logout</a></li>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Logging Out Fam?!</h3>
    <p className="py-4">You finna leave this app?!....for real dawg?</p>
    <div className="modal-action">
      <form method="dialog">
      <button onClick={logOutUser} className="btn mr-5">On God</button>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Cap</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default LogoutModal