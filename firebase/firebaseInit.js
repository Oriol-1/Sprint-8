import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';

const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();

const auth = getAuth(app);
const db = getFirestore(app);

const Firebase = {
  app,
  auth,
  db,
};

export default Firebase;