import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from './firebaseConfig'
import {addDoc, collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'


const globalContext = createContext()
export const Context = ({ children }) => {
  const [User, setUser] = useState(null)
  const [userDetails, setuserDetails] = useState()
  const [userDetailsIntern, setuserDetailsIntern] = useState()
  const [userDetailsEmployer, setuserDetailsEmployer] = useState();
  const [allJobs, setAllJobs] = useState()

  const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
      return () => {
        unsubscribe()
      }
    }, [])
// First three functions are self-explanitory
    const signUp = async(email, password) => {
       try {
        return await createUserWithEmailAndPassword(auth, email, password)
       } catch (error) {
        console.log(error)
       }
   }
    const logIn = async(email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = async () => {
       return await signOut(auth)
  }

  // Function for getting a random set of numbers for uid/ids
  // function generateRandomUid() {
  //   const timestamp = new Date().getTime().toString(16); // Convert current time to hexadecimal
  //   const randomPart = Math.random().toString(16).substring(2); // Generate random hexadecimal
  //   return timestamp + randomPart;
  // }
  // const randomUid = generateRandomUid()

  // function for getting and storing the dat of all users either employers or interns
  const allUsers = async (FirstName, LastName, email, itOrEm) => {
    try {
      await setDoc(doc(db, 'users', User.uid), {
        uid: User.uid,
        Firstname: FirstName || '',
        Lastname: LastName || '',
        Email: email || '',
        itOrEm
      });
      console.log('added to all users');

    }
    catch (error) {
      console.log(error)
     }
  }
  
  // function for getting only the employers data
  const createEmployerDetails = async (FirstName, LastName, email, Company, bio, about, skillsList) => {
    try {
      await setDoc(doc(db, 'Employerusers', User.uid), {
        uid: User.uid,
        FirstName,
        LastName,
        Email: email || '',
        Company,
        Bio: bio || '',
        About: about || '',
        Employer: 'yes',
        skillsList      
      });
      console.log('Welcome employer');
      navigate('/Home')

    }
    catch (error) {
      console.log(error)
     }
  }

  // function for getting only the interns data
  const createInternDetails = async (FirstName, LastName, email, skillsList, bio, about) => {
    try {
      await setDoc(doc(db, 'Internusers', User.uid), {
        uid: User.uid,
        FirstName,
        LastName,
        Email: email || '',
        skillsList,
        Bio: bio || '',
        About: about || '',
        Intern:'yes'
      });
      console.log('Welcome intern');
      navigate('/Home')

    }
    catch (error) {
      console.log(error)
     }
  } 

  // function for fetching the data of all the users either employers or interns
  const fetchUserData = async () => {
    try {
      if (User?.uid) {
        const docRef = doc(db, 'users', User?.uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setuserDetails(docSnap.data())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  // function for getting only the employer data
  const fetchUserDataEmployer = async () => {
    try {
      if (User?.uid) {
        const docRef = doc(db, 'Employerusers', User?.uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setuserDetailsEmployer(docSnap.data())
        }
    
      
      }
    } catch (error) {
          console.log(error)
        }
   

  }
  
  // function for getting only interns data 
    const fetchUserDataIntern = async () => {
    try {
      if (User?.uid) {
        const docRef = doc(db, 'Internusers', User?.uid);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setuserDetailsIntern(docSnap.data())
        }
      
      }
    } catch (error) {
          console.log(error)
        }
   
  }
  
  const postJob = async (role, salary, typeOfWork, duration, description, company, location, datePosted, hireStopAt) => {
    // createdAt: formattedTimestamp,
    try {
      // const notify = () => toast("Job Posted 😁");
        // setSpinner(true);
        const postRef = collection(db, "jobs");
        await addDoc(postRef, {
          role,
          salary,
          typeOfWork,
          duration,
          description,
          // postedBy: userDetails?.UsernameInput,
          userId: User?.uid,
          company
        });

        console.log("posted");
        // setSpinner(null);
        // notify();
    
    } catch (error) {
      // alert('Something went wrong, please try again')
      console.error(error);
    }
  };

  const getJobs = () => {
    const allJobsRef = collection(db, "jobs");
    const unsub = onSnapshot(allJobsRef, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ ...doc.data(), id: doc.id });
        setAllJobs(jobs);
        console.log(allJobs);
      });
    });

    return () => unsub();
  };
    
    
   
    
  return (
    <globalContext.Provider value={{User, userDetails, userDetailsIntern, userDetailsEmployer, allJobs, signUp, logIn, logOut, createEmployerDetails, createInternDetails, allUsers, fetchUserData, fetchUserDataEmployer, fetchUserDataIntern, postJob, getJobs}}>
    {children}
</globalContext.Provider>
  )
}

export function UserContext() {
    return useContext(globalContext)
}