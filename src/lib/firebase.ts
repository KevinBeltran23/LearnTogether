// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOqxqxJ4a1ZAT5j6mQFdikkIY46Tuo1RM',
  authDomain: 'studybuddy-8fbf7.firebaseapp.com',
  projectId: 'studybuddy-8fbf7',
  storageBucket: 'studybuddy-8fbf7.firebasestorage.app',
  messagingSenderId: '1006341549452',
  appId: '1:1006341549452:web:13d5b7a323226019f03aa9',
  measurementId: 'G-VG8621Z1FZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
