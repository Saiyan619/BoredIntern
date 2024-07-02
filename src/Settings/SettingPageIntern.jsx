import React from 'react'
import { useState , useEffect} from 'react';
import { UserContext } from '../Utilities/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../Utilities/firebaseConfig';
import Navigation from '../Pages/Navigation';
import { skillsList } from '../Components/RoleData';
import { doc, updateDoc } from 'firebase/firestore';

const SettingPageIntern = () => {

  const [newFirstName, setnewFirstName] = useState('')
  const [newLastName, setnewLastName] = useState('')
  const [newCompany, setnewCompany] = useState('')
  const [newEmail, setnewEmail] = useState('')
  const [newBio, setnewBio] = useState('')
  const [newAbout, setnewAbout] = useState('')
  const [newimgProfile, setnewImgProfile] = useState('')
  const [newselectedSkills, setSnewelectedSkills] = useState([]);

  function handleFirstName(e) {
    setnewFirstName(e.target.value)
  }function handleLastName(e) {
    setnewLastName(e.target.value)
  }function handleCompany(e) {
    setnewCompany(e.target.value)
  }function handleEmail(e) {
    setnewEmail(e.target.value)
  }function handleBio(e) {
    setnewBio(e.target.value)
  }function handleAbout(e) {
    setnewAbout(e.target.value)
  }

  const { createEmployerDetails, allUsers, User, loader, setLoader , userDetailsEmployer} = UserContext();
  
 
  
  const [warning, setWarning] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked && newselectedSkills.length >= 3) {
      setWarning(true);
      return;
    }

    setWarning(false);
    if (checked) {
      setSnewelectedSkills([...newselectedSkills, value]);
    } else {
      setSnewelectedSkills(newselectedSkills.filter(skill => skill !== value));
    }
  };
   
  
    const updateProfile = async () => {
      try {
        console.log('updating')

        const timestamp = new Date().getTime(); 
        let url
          if (newimgProfile) {
            const imageRef = ref(storage, `profilePicture/${timestamp}`)
          const snap = await uploadBytes(imageRef, newimgProfile)
            let getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = getUrl
            console.log('pic uploaded')
          }
          
      const updateRef = doc(db, "Internusers", User.uid);
        await updateDoc(updateRef, {
          profileImg: url === '' ? userDetailsIntern?.profileImg : url,
          FirstName: newFirstName === '' ? userDetailsIntern.FirstName : newFirstName,
          LastName: newLastName === '' ? userDetailsIntern.LastName : newLastName,
          Email: newEmail === '' ? userDetailsIntern.Email : newEmail,
          Company: newCompany === '' ? userDetailsIntern.Company : newCompany,
          Bio: newBio === '' ? userDetailsIntern.Bio : newBio,
          About: newAbout === '' ? userDetailsIntern.About : newAbout,
          skillsList: newselectedSkills === '' ? userDetailsIntern.skillsList : newselectedSkills,
          
      });
        console.log('updated')
    } catch (error) {
        console.error(error)
    }
    };
  
  
  return (
    <div>
      <Navigation />
      <div className='p-4'> 
      <h1 className='text-4xl'>Settings for interns</h1>
       
        <div className='flex flex-col mt-5'>
        <span className='text-2xl'>Edit/Update your profile</span>
      
          <div className='mt-5'>
      
            <label className="form-control w-full max-w-xs">
        <div className="label">
        <span className="label-text">New First Name</span>
  </div>
  <input onChange={handleFirstName} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
      </label>

      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">New Last Name</span>
  </div>
  <input onChange={handleLastName} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
      </label>

      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">New Profile Pic</span>
  </div>
  <input onChange={(e)=>{setnewImgProfile(e.target.files[0])}} type="file" className="file-input file-input-bordered w-full max-w-xs" />

          </label>    
      
      <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">Company or Self Hiring(If Self Hiring just type 'self hiring')</span>

  </div>
  <input onChange={handleCompany} type="text" placeholder="Company or self hiring" className="input input-bordered w-full max-w-xs" />
       
          </label>

          <label className="form-control w-full max-w-xs">

          <div className="label">
            <span className="label-text">New Email</span>
            </div>
            <input onChange={handleEmail} type="text" placeholder="email" className="input input-bordered w-full max-w-xs" />

            </label>

          <label className="form-control">
  <div className="label">
    <span className="label-text">New bio</span>
  </div>
  <textarea onChange={handleBio} className="textarea textarea-bordered h-24" placeholder="Make it short and catchy"></textarea>
     </label>

             <label className="form-control">
  <div className="label">
    <span className="label-text">New About</span>
  </div>
  <textarea onChange={handleAbout} className="textarea textarea-bordered h-24" placeholder="About"></textarea>

            </label>
          
          

          <div className="max-w-md p-8">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        Select your skills (up to 3)
        </label>
        <span>{newselectedSkills.map((items) => {
          return <button className="btn no-animation">{items}</button>
        })}</span>
      <div className="space-y-2 h-40 overflow-auto">
        {skillsList.map(skill => (
          <div key={skill.value} className="flex items-center">
            <input
              type="checkbox"
              id={skill.value}
              value={skill.value}
              checked={newselectedSkills.includes(skill.value)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={skill.value} className="ml-2 block text-sm text-gray-700">
              {skill.label}
            </label>
          </div>
        ))}
      </div>
      {warning && (
        <p className="text-red-500 mt-2">You can select up to 3 skills.</p>
      )}
          </div>

          
            <div>
        <span className='text-2xl'>Change Theme</span> 
      </div>
          
          <button onClick={updateProfile} className="btn w-full rounded-full"> <span className={`${loader} loading-spinner`}></span>Update</button>

          </div>
          
         
      </div>
      </div>

      </div>
  )
}

export default SettingPageIntern