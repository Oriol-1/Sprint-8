import React, { useState } from 'react';
import Layout from '../../components/Header/Layout';
import { Formulario, Campo, Label, InputContainer, Input, IconoValidacion, Error, ImputSubmit } from '../../components/ui/Formulario';
import Router from 'next/router';
import useValidacion from '../../hooks/useValidacion';
import validarIniciarSesion from '../../validacion/validarIniciarSesion';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const STATE_INICIAL = {
  email: '',
  password: '',
};

const Login = () => {
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;


  async function iniciarSesion() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEnviado(true);
      Router.push('/Starships')
        .then(() => {
          setEnviado(false);
        })
        .catch((error) => {
          console.error('Hubo un error al autenticar el usuario', error.message);
          setError(error.message);
        });
    } catch (error) {
      console.error('Hubo un error al iniciar sesión', error);
      setError(error.message || 'Error desconocido al iniciar sesión');
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 className="text-center">Login</h1>
          <Formulario onSubmit={handleSubmit}>
          
     

            <Campo>
              <Label htmlFor="email">Email</Label>
              <InputContainer>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                 error={errores.email && enviado}
                /> 
                {enviado && valores.email && !errores.email && (
                  <IconoValidacion valido>✔️</IconoValidacion>
                )}

              </InputContainer>
              {enviado && errores.email && <Error>{errores.email}</Error>}
            </Campo>

            <Campo>
              <Label htmlFor="password">Password</Label>
              <InputContainer>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                 error={errores.password && enviado}
                />
                {enviado && valores.password && !errores.password && (
                  <IconoValidacion valido>✔️</IconoValidacion>
                )}
              
              </InputContainer>
              {enviado && errores.password && <Error>{errores.password}</Error>}
            </Campo>

           
            {error && <Error>{error}</Error>}

            <Campo>
            <ImputSubmit type="submit" value="Iniciar sesión" onClick={() => setEnviado(true)} />
            </Campo>
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login