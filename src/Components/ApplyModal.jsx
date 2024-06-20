import React from 'react'

const ApplyModal = () => {
  return (
      <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
 
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Full Name</span>
                </div>
            <input  type="text" placeholder="Olaniyi Ebenezer" className="input input-bordered w-full max-w-xs" />
         
                  </label>
                  
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Email</span>
                </div>
            <input  type="text" placeholder="abc123@gmail.com" className="input input-bordered w-full max-w-xs" />
         
                  </label>
                  
                  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">CV</span>
                </div>
            <input type="text" placeholder="pdf" className="input input-bordered w-full max-w-xs" />
         
                  </label>

                  <div className="modal-action">
                  <button className="btn">Apply</button>
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