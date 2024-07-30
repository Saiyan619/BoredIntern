import React from 'react'
import { useState } from 'react'
import { UserContext } from '../Utilities/Context'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../Utilities/firebaseConfig';
import { skillsList } from '../Components/RoleData';

const CreateProfileIntern = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [imgProfile, setImgProfile] = useState('');
  const [Email, setEmail] = useState('')
  const [Bio, setBio] = useState('')
  const [About, setAbout] = useState('')

  const { createInternDetails, allUsers, loader, setLoader } = UserContext();
  
  function handleFirstName(e) {
    setFirstName(e.target.value)
  }function handleLastName(e) {
    setLastName(e.target.value)
  }
    function handleEmail(e) {
    setEmail(e.target.value)
  }function handleBio(e) {
    setBio(e.target.value)
  }function handleAbout(e) {
    setAbout(e.target.value)
  }

  // const addToAllUsers = async () => {
  //   if (FirstName && LastName !== '') {
  //     await allUsers(FirstName, LastName)
  //   } else {
  //     console.log('fill in the spaces')
  //   }
   
  // }

  // const skillsList = [
  //   { value: 'software-developer', label: 'Software Developer' },
  //   { value: 'frontend-developer', label: 'Frontend Developer' },
  //   { value: 'backend-developer', label: 'Backend Developer' },
  //   { value: 'fullstack-developer', label: 'Fullstack Developer' },
  //   { value: 'data-scientist', label: 'Data Scientist' },
  //   { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  // ];
const [selectedSkills, setSelectedSkills] = useState([]);
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
  console.log(selectedSkills)

  const internDetails = async () => {
    try {
      setLoader('loading')
      const timestamp = new Date().getTime();
      if (imgProfile) {
      let imageRef = ref(storage, `profilePicture/${timestamp}`);
      let snap = await uploadBytes(imageRef, imgProfile);
      const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        console.log('pic uploaded')
        await createInternDetails(FirstName, LastName, getUrl, Email, selectedSkills, Bio, About)
        allUsers()
        setLoader('')
      }
      
    } catch (error) {
      console.log(error)
      setLoader('')
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center flex-col mt-20'>
        
        <span className='text-4xl'>Fill in your Intern Profile</span>

        <div className='mt-10'>

        <label className="form-control w-full max-w-xs">
        <div className="label">
        <span className="label-text">First Name</span>
  </div>
  <input onChange={handleFirstName} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
      </label>

      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input onChange={handleLastName} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Profile Pic</span>
  </div>
  <input onChange={(e)=>{setImgProfile(e.target.files[0])}} type="file" className="file-input file-input-bordered w-full max-w-xs" />

          </label>    
          <div>
        
           
            <label className="form-control">
  <div className="label">
    <span className="label-text">Email</span>
  </div>
  <input onChange={handleEmail} type="text" placeholder="email" className="input input-bordered w-full max-w-xs" />
  </label>
            
            <label className="form-control">
  <div className="label">
    <span className="label-text">Your bio</span>
  </div>
  <textarea onChange={handleBio} className="textarea textarea-bordered h-24" placeholder="Write something catchy"></textarea>
     </label>

             <label className="form-control">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <textarea onChange={handleAbout} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

            </label>
          </div>
          
          <div className="max-w-md mx-auto p-8">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        Select your skills (up to 3)
        </label>
        <span>{selectedSkills.map((items) => {
          return <button className="btn no-animation">{items}</button>
        })}</span>
            
      <div className="space-y-2 h-40 overflow-auto">
      {skillsList.map(skill => (
          <div key={skill.value} className="flex items-center ">
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
        <p className="text-red-500 mt-2">You cannot select more than 3 skills.</p>
      )}
          </div>
          

          <button onClick={internDetails} className={`btn w-full rounded-full mt-5`}> <span className={`${loader} loading-spinner`}></span>Next</button>

        </div>
        </div>
  
    </div>
  )
}

export default CreateProfileIntern
