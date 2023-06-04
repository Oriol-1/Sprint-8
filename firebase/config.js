import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importa 'getAuth' de 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRuK31ZdaJ8yIdVmDxdqCONYOLw5yLpO0",
    authDomain: "start-wars-api-14d89.firebaseapp.com",
    projectId: "start-wars-api-14d89",
    storageBucket: "start-wars-api-14d89.appspot.com",
    messagingSenderId: "840486254804",
    appId: "1:840486254804:web:2c3e5a4b91402ebb086341"
  };
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);
  
  const Firebase = {
    app,
    auth,
    db,
  };
  
  export { firebaseConfig };