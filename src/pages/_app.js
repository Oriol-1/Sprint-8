import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from 'next/head';
import App from 'next/app';
import firebase, { FirebaseContext } from '../../firebase';
import useAutenticacion from '../../hooks/useAutenticacion';
import dynamic from 'next/dynamic';

const DynamicBootstrapScripts = dynamic(
  () => import('bootstrap/dist/js/bootstrap.bundle').then(() => {
    return () => null;
  }),
{ ssr: false }
);

const MyApp = (props) => {
  const usuario = useAutenticacion();
  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
      }}
    >
      <DynamicBootstrapScripts />
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
