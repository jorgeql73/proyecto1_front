import React from 'react'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../loginCredencial';
const auth = getAuth(appFirebase);

const Home = ({userEmail}) => {

  return (
    <div>
        <h1>Home {userEmail}</h1>
        <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => signOut(auth)}
        sx={{ borderRadius: 2 }}
        >
            Cerrar Sesión
       </Button>
    </div>
  )
}

export default Home