import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {getAuth, signOut} from "firebase/auth"
import MasterNotes from './components/Notes/MasterNotes';
import AuthPanel from './components/Login_Registration/AuthPanel';
import Hero from './components/Login_Registration/Hero';
import ProtectedRoute from './components/Security/ProtectedRoute';


function App() {

  const auth = getAuth();
  const [user, setUser] = useState('')

  useEffect(() => {
    //Store in localStorage that user is currently logged in:
    console.log("In app useEffect: " + user)

    if(user.uid != undefined )
    {
      
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.displayName)
      localStorage.setItem('uid', user.uid)
    }
  }, [user])

  const handleLogout = () => {
      signOut(auth)
      .then((success) =>
      {
          console.log("Succesful logout!" + success)
          setUser('')
          localStorage.clear()
          
          window.location.href="/notes"
      })
      .catch(err => 
      {
        console.log("Unsuccesful logout!")
        console.log(err)
      });
  };

  return (
    <Router>
      <Hero handleLogout={handleLogout} user={user}/>
      <Routes>
        <Route path="/login" element={<AuthPanel auth={auth} user = {user} setUser = {setUser} />}/>
        <Route element={<ProtectedRoute/>}>\
          <Route path="/" element={<MasterNotes user={user}/>}/>
          <Route exact path="/notes" element={<MasterNotes user={user}/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
