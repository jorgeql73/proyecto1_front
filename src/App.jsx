
import './App.css'
import React, { useState } from 'react'
//firbase_login
import appFirebase from '../src/loginCredencial'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);
//Componentes
import Login from './components/login/Login';
import Home from './pages/Home';


function App() {
  
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase){
      setUser(userFirebase);
    }else{
      setUser(null);
    }
  });

  return (
    <div>
      {user ? <Home userEmail={user.email} /> : <Login/>}
    </div>
  )
}

export default App
