import React from 'react'
import { useState } from 'react'
import { UserContext } from '../Utilities/Context'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../Utilities/firebaseConfig'

const ApplyModal = ({id}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [cv, setCv] = useState('')
 
  const { User, appliedJobs, loader, setLoader } = UserContext();
 

  const applyJob = async() => {
          const timestamp = new Date().getTime();
    try {
      if (cv) {
        setLoader('loading')
        let cvRef = ref(storage, `CV/${timestamp}`);
        let snap = await uploadBytes(cvRef, cv);
        const getCvUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        console.log('cv uploaded');
        appliedJobs(fullName, email, getCvUrl, id);
        console.log('job applied to')
        alert('You have successfully applied... just pray say employer call you')
        setLoader('')
        setFullName('')
        setEmail('')
        setCv([])
      }
     
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="mt-4 btn btn-primary" onClick={()=>document.getElementById('my_modal_4').showModal()}>Fill out Job</button>
<dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
 
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Full Name</span>
                </div>
            <input onChange={(e)=>{setFullName(e.target.value)}}  type="text" placeholder="Olaniyi Ebenezer" className="input input-bordered w-full max-w-xs" />
         
                  </label>
                  
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Email</span>
                </div>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="abc123@gmail.com" className="input input-bordered w-full max-w-xs" />
         
                  </label>
                  
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Cv</span>
  </div>
  <input onChange={(e)=>{setCv(e.target.files[0])}} type="file" className="file-input file-input-bordered w-full max-w-xs" />

          </label>  

                  <div className="modal-action">
                  <button onClick={applyJob} className="btn"><span className={`${loader} loading-spinner`}></span>Apply</button>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default ApplyModal