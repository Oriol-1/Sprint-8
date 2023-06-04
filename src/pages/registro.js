// 1 Importas los componentes y funciones necesarios.
// 2 Inicializas el estado inicial del formulario utilizando ( useState ).
// 3 Utilizas el hook personalizado (useValidacion) para manejar la validación del formulario.
// 4 Implementas la función (crearCuenta) que crea una cuenta de usuario en Firebase utilizando (createUserWithEmailAndPassword) y (updateProfile).
// 5 Renderizas el formulario con sus campos y manejas el cambio y la validación de los campos utilizando (handleChange), (handleBlur), y el estado de (errores).
// 6 En caso de error al crear la cuenta, se muestra el mensaje de error.
// 6 Utilizas el HOC (withOptionalAuth) para proteger la ruta del registro.



import React, { useState, useEffect } from 'react';
import Layout from '../../components/Header/Layout';
import { Formulario, Campo, Label, InputContainer, Input, IconoValidacion, Error, ImputSubmit } from '../../components/ui/Formulario';
import Router from 'next/router';
import useValidacion from '../../hooks/useValidacion';
import validarCrearCuenta from '../../validacion/validarCrearCuenta';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import withOptionalAuth from '../../components/hoc/withOptionalAuth';

const STATE_INICIAL = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmar: ''
};

const Registro = () => {
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, apellido, email, password, confirmar } = valores;

  // 7. Verificar si el usuario actual ya está autenticado y redirigir a la página de Starships
  useEffect(() => {
    // La función authListener verifica si hay un usuario autenticado actualmente
    const authListener = () => {
      if (auth.currentUser) {
        // Si hay un usuario autenticado, redirige a la página de Starships
        Router.push('/Starships');
      }
    };

    try {
      authListener();
    } catch (error) {
      console.error('Error al llamar a authListener:', error);
    }

    // La función de limpieza se ejecutará cuando el componente se desmonte
    return () => { };
  }, []); // El arreglo vacío [] asegura que el efecto solo se ejecute una vez al montar el componente

  async function crearCuenta() {
    try {
      const nuevoUsuario = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(nuevoUsuario.user, {
        displayName: nombre,
      });
      Router.push('/Starships')
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      setError(error.message);
    }
  }

  return (

    <div>
      <Layout>
        <>
          <h1 className="text-center">Registro</h1>
          <Formulario onSubmit={handleSubmit}>
          <Campo>
            <Label htmlFor="nombre">Nombre</Label>
            <InputContainer>
              <Input
                type="text"
                id="nombre"
                placeholder="Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errores.nombre && enviado}
                />
                {enviado && valores.nombre && !errores.nombre && (
                  <IconoValidacion valido>✔️</IconoValidacion>
                )}
              </InputContainer>
              {enviado && errores.nombre && <Error>{errores.nombre}</Error>}
            </Campo>
            <Campo>
              <Label htmlFor="apellido">Apellido</Label>
              <InputContainer>
                <Input
                  type="text"
                  id="apellido"
                  placeholder="Apellido"
                  name="apellido"
                  value={apellido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errores.apellido && enviado}
                />
                {enviado && valores.apellido && !errores.apellido && (
                  <IconoValidacion valido>✔️</IconoValidacion>
                )}
          
              </InputContainer>
              {enviado && errores.apellido && <Error>{errores.apellido}</Error>}
            </Campo>

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

            <Campo>
              <Label htmlFor="confirmar">Confirmar Password</Label>
              <InputContainer>
                <Input
                  type="password"
                  id="confirmar"
                  placeholder="Confirmar Password"
                  name="confirmar"
                  value={confirmar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errores.confirmar && enviado}
                />
                {enviado && valores.confirmar && !errores.confirmar && (
                  <IconoValidacion valido>✔️</IconoValidacion>
                )}

              </InputContainer>
              {enviado && errores.confirmar && <Error>{errores.confirmar}</Error>}

            </Campo>
            {error && <Error>{error}</Error>}

            <Campo>
            <ImputSubmit type="submit" value="Crear Cuenta" onClick={() => setEnviado(true)} />
            </Campo>
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default withOptionalAuth(Registro);
