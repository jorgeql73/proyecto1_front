import React from 'react'
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import app_firebase from '../../loginCredencial';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app_firebase);


const Login = () => {
    const [register, setRegister] = React.useState(false);


    const authentificationLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(register){
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error);
            }
        }  

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
    
        console.log({ email, password }); // Aquí puedes manejar el login
      };
    
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
    >
        <Card elevation={3} sx={{ maxWidth: 400, p: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Iniciar Sesión
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Por favor, ingresa tus credenciales para continuar.
                </Typography>
                <form onSubmit={authentificationLogin}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Correo Electrónico"
                        type="email"
                        name="email"
                        id='email'
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contraseña"
                        type="password"
                        name="password"
                        id='password'
                        variant="outlined"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        {register ? "Registrarse" : "Iniciar Sesión"}
                    </Button>
                </form>
                <h4>
                    {register ? "Si ya tienes cuenta" : "no tienes cuenta"}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => setRegister(!register)}
                    >
                        {register ? "Iniciar Sesión" : "Registrarse"}
                    </Button>
                </h4>
            </CardContent>
        </Card>
    </Box>
  )
}

export default Login