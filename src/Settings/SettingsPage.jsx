import React from 'react'
import { useState } from 'react';
import { UserContext } from '../Utilities/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../Utilities/firebaseConfig';
import Navigation from '../Pages/Navigation';
import { skillsList } from '../Components/RoleData';

const SettingsPage = () => {

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Company, setCompany] = useState('')
  const [Email, setEmail] = useState('')
  const [Bio, setBio] = useState('')
  const [About, setAbout] = useState('')
  const [imgProfile, setImgProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([]);

  function handleFirstName(e) {
    setFirstName(e.target.value)
    console.log(FirstName)
  }function handleLastName(e) {
    setLastName(e.target.value)
  }function handleCompany(e) {
    setCompany(e.target.value)
  }function handleEmail(e) {
    setEmail(e.target.value)
  }function handleBio(e) {
    setBio(e.target.value)
  }function handleAbout(e) {
    setAbout(e.target.value)
  }

  const { createEmployerDetails, allUsers, User, loader, setLoader } = UserContext();
  
  
  const [warning, setWarning] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked && selectedSkills.length >= 3) {
      setWarning(true);
      return;
    }

    setWarning(false);
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter(skill => skill !== value));
    }
  };

  const createEmployerProfile = async () => {
    try {
      
        const timestamp = new Date().getTime();
      if (imgProfile) {
        setLoader('loading')
          let imageRef = ref(storage, `profilePicture/${timestamp}`);
          let snap = await uploadBytes(imageRef, imgProfile);
          const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
          console.log('pic uploaded')
          if (FirstName && LastName && Company !== '') {
            await createEmployerDetails(getUrl, FirstName, LastName, Email, Company, Bio, About, selectedSkills)
            allUsers();
            setLoader('loading')
          } else {
            alert('fill in the spaces')
            setLoader('')
          }
        
        }
      } catch (error) {
      console.log(error)
      setLoader('')
      }
    }
   
  
    const updateProfile = async () => {
      try {
        // const timestamp = new Date().getTime();
        // let url;
        // if (imagePost) {
        //   const imgPostRef = ref(storage, `pins/${User.uid}/${timestamp}`);
        //   const snap = await uploadBytes(imgPostRef, imagePost)
        //   const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
          //   url = getUrl

          const timestamp = new Date().getTime(); 
          let url;
          if (newProfileImage) {
            const imgRef = ref(storage, `avatar/${User.uid}/${timestamp}`)
          const snap = await uploadBytes(imgRef, newProfileImage)
              const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
              url = getUrl;
          }
          
      const updateRef = doc(db, "users", User.uid);
      await updateDoc(updateRef, {
          UsernameInput: newUsername === '' ? userDetails.UsernameInput : newUsername,
          avatar: newProfileImage === '' ? userDetails?.avatar : url
      });
        console.log('updated')
    } catch (error) {
        console.error(error)
    }
    };9
  
  
  return (
    <div>
      <Navigation />
      <div className='p-4'> 
      <h1 className='text-4xl'>Settings</h1>
       
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
  <input onChange={(e)=>{setImgProfile(e.target.files[0])}} type="file" className="file-input file-input-bordered w-full max-w-xs" />

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
        <span>{selectedSkills.map((items) => {
          return <button className="btn no-animation">{items}</button>
        })}</span>
      <div className="space-y-2 h-40 overflow-auto">
        {skillsList.map(skill => (
          <div key={skill.value} className="flex items-center">
            <input
              type="checkbox"
              id={skill.value}
              value={skill.value}
              checked={selectedSkills.includes(skill.value)}
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
          
          <button onClick={createEmployerProfile} className="btn w-full rounded-full"> <span className={`${loader} loading-spinner`}></span>Next</button>

          </div>
          
         
      </div>
      </div>

      </div>
  )
}

export default SettingsPage