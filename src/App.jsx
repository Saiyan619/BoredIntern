import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";
import SignUp from './Pages/SignUp';
import EmployerOrIntern from './Pages/EmployerOrIntern';
import CreateProfileEmployer from './Pages/CreateProfileEmployer';
import CreateProfileIntern from './Pages/CreateProfileIntern';
import { Context } from './Utilities/Context';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProfilePage from './Pages/Profile/ProfilePage';
import Internships from './Internships/Internships';
import SettingsPage from './Settings/SettingsPage';
import PostJobs from './Pages/PostJobs';
import IntershipDetails from './Internships/IntershipDetails';
import Dashboard from './Dashboard/Dashboard';

function App() {

  return (
    <>
      
      <BrowserRouter>
        <Context>
        <NextUIProvider>
        <Routes>
        <Route path='/' element={<SignUp />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/EmployerorIntern?' element={<EmployerOrIntern/>} />
            <Route path='/CreateProfileEmployer' element={<CreateProfileEmployer/>} />
            <Route path='/CreateProfileIntern' element={<CreateProfileIntern/>} />
            <Route path='/Home' element={<Home />} />
            <Route path='/ProfilePage' element={<ProfilePage />} />
            <Route path='/Internships' element={<Internships />} />
            <Route path='/PostJobs' element={<PostJobs />} />
            <Route path='/SettingsPage' element={<SettingsPage />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Internships/InternshipDetails/:id' element={<IntershipDetails />} />
        
            </Routes>
            </NextUIProvider>
          </Context>
          </BrowserRouter>
    </>
  )
}

export default App
