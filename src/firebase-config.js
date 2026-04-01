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

// Check if using placeholder API key
if (firebaseConfig.apiKey.includes('xXx') || firebaseConfig.apiKey.includes('AIzaSyDNBd9x')) {
  console.warn(
    '⚠️ FIREBASE CONFIG ERROR: API key is using placeholder values!\n' +
    'To fix this:\n' +
    '1. Go to https://console.firebase.google.com/project/nexora-lift/settings/general\n' +
    '2. Select your Web App under "Your apps"\n' +
    '3. Copy the entire firebaseConfig object\n' +
    '4. Replace the values in src/firebase-config.js\n\n' +
    'Currently, Authentication features will not work!'
  )
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
