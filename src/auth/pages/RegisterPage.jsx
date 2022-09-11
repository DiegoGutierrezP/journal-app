
import { Grid, TextField, Typography,Button, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


const formData = {
  email:'',
  password:'',
  displayName:''
}

const formValidations={
  email:[(value) => value.includes('@'),'El correo debe tener una @'],
  password:[(value) => value.length >= 6,'El password debe de tner mas de 6 letras'],
  displayName : [(value)=>value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status,errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(()=>status === 'checking',[status])

  const {
    displayName,email,password,onInputChange,formState,
    isFormValid,emailValid,displayNameValid,passwordValid
  } = useForm(formData,formValidations);

  const onSubmit = (e)=>{
    e.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
    //console.log(formState);
  }

  return (
    <AuthLayout title="Register">
     {/*  <h1>FormValid {isFormValid ? 'valido':'Incorrecto'}</h1> */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animat__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Diego Gutierrez"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '':'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} >
              <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr:1}}>¿Ya tienes Cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
