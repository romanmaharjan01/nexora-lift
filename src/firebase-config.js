import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyDNBd9xXxXxXxXxXxXxXxXxXxXxXxXxXx',
  authDomain: 'nexora-lift.firebaseapp.com',
  projectId: 'nexora-lift',
  storageBucket: 'nexora-lift.appspot.com',
  messagingSenderId: '256539194091',
  appId: '1:256539194091:web:xXxXxXxXxXxXxXxXxXxXxXx',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
