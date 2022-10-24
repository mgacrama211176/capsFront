import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANVWxuSMpTkyS1rpiuny71Wsin4rHRm3c',
  authDomain: 'filanimelogins.firebaseapp.com',
  projectId: 'filanimelogins',
  storageBucket: 'filanimelogins.appspot.com',
  messagingSenderId: '986533966068',
  appId: '1:986533966068:web:014060b95937575bf02ea1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export default app;
