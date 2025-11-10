import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyAAYW1uIaayt4Dw4JwOygNPpQeUrn-F3f8',
  authDomain: 'weigth-4bc4f.firebaseapp.com',
  projectId: 'weigth-4bc4f',
  storageBucket: 'weigth-4bc4f.firebasestorage.app',
  messagingSenderId: '970793021929',
  appId: '1:970793021929:web:2ebeafb3867b1d688edb78',
}
const app = initializeApp(firebaseConfig)

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
})

export const auth = getAuth()
