// Importa 'auth' desde el archivo 'firebase.js'

import { auth } from '../../firebase/firebase';

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../src/styles/header.module.css';


import Image from 'next/image';
import { FirebaseContext } from '../../firebase';
import { signOut } from 'firebase/auth';
const logo = require('../../public/logo.png');
export default function Header() {
  const { usuario, firebase } = useContext(FirebaseContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  const handleLogout = async () => {
    try {
      // Utiliza 'auth' para cerrar sesión
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className={styles.header.topNav}>
      {/* registro */}
      <div className={`${styles.registro} d-flex justify-content-end align-items-center flex-row mt-5 text-decoration-none`}>
      <p className="d-flex justify-content-end align-items-center flex-row mt-4 accordion usuario" style={{ color: usuario ? 'yellow' : 'inherit' }}>
        Hola: {usuario ? usuario.displayName : 'Invitado'}
      </p>
        {!usuario && (
          <>
            <Link href="/login" className={`${currentRoute === '/login' ? styles.active : styles.nonActive}`}>
              Login
            </Link>
            <Link href="/registro" className={`${currentRoute === '/registro' ? styles.active : styles.nonActive}`}>
              Register
            </Link>
          </>
        )}
        {usuario && (
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>

      {/* logo */}
      <Link href={'/'}>
        <div className={`d-flex justify-content-center align-items-center flex-row mt-5 ${styles['transition-out-circle']}`}>
        
          <Image className={`logo`} src={logo.default} alt="logo" priority />
        </div>
      </Link>

      {/* menu principal */}
      <Container className={`d-flex justify-content-center align-items-center flex-row mt-5 ${styles.topNav}`}>
        <nav className={`${styles.navegacion} ${styles['transition-out-circle']}`}>
          <Link href="/" className={`${currentRoute === '/' ? styles.active : styles.nonActive}`}>
            Home
          </Link>
          <Link href="/Starships" className={`${currentRoute === '/Starships' ? styles.active : styles.nonActive}`}>
            Starships
          </Link>
        </nav>
      </Container>
    </header>
  );
}
