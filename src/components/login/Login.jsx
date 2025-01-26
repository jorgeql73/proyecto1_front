import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import app_firebase from "../../loginCredencial";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app_firebase);

const Login = () => {
  const [register, setRegister] = React.useState(false);
  const [firebaseError, setFirebaseError] = React.useState(""); // Estado para manejar errores de Firebase
  const { register: formRegister, handleSubmit, formState: { errors }, clearErrors } = useForm();

  const authentificationLogin = async (data) => {
    const { email, password } = data;
    setFirebaseError(""); // Limpia errores previos

    try {
      if (register) {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", user);
      } else {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado:", user);
      }
    } catch (error) {
      console.error("Error de Firebase:", error.code);
      switch (error.code) {
        case "auth/invalid-credential":
            setFirebaseError("No existe un usuario con este correo.");
            break;
        case "auth/user-not-found":
          setFirebaseError("No existe un usuario con este correo.");
          break;
        case "auth/wrong-password":
          setFirebaseError("La contraseña es incorrecta.");
          break;
        case "auth/email-already-in-use":
          setFirebaseError("El correo ya está en uso.");
          break;
        case "auth/invalid-email":
          setFirebaseError("El formato del correo es inválido.");
          break;
        case "auth/weak-password":
          setFirebaseError("La contraseña es muy débil. Debe tener al menos 6 caracteres.");
          break;
        default:
          setFirebaseError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
          break;
      }
    }
  };

  const handleOutsideClick = () => {
    clearErrors(); // Limpia todas las validaciones locales
    setFirebaseError(""); // Limpia los errores de Firebase
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      onClick={handleOutsideClick} // Detecta clics en cualquier lado
    >
      <Card
        elevation={3}
        sx={{ maxWidth: 400, p: 3, borderRadius: 2 }}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del formulario limpie las validaciones
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {register ? "Registrarse" : "Iniciar Sesión"}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {register
              ? "Crea una cuenta nueva para empezar."
              : "Por favor, ingresa tus credenciales para continuar."}
          </Typography>

          {/* Mostrar errores de Firebase */}
          {firebaseError && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {firebaseError}
            </Typography>
          )}

          <form onSubmit={handleSubmit(authentificationLogin)}>
            <TextField
              fullWidth
              margin="normal"
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              {...formRegister("email", { 
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de correo inválido"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type="password"
              variant="outlined"
              {...formRegister("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            <Button color="secondary" onClick={() => setRegister(!register)}>
              {register ? "Inicia Sesión" : "Regístrate"}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
