import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAZe_957xX28aetQWWxvMoIKISWNE_RLdo',
  authDomain: 'cosplayer-voting.firebaseapp.com',
  projectId: 'cosplayer-voting',
  storageBucket: 'cosplayer-voting.appspot.com',
  messagingSenderId: '664875905615',
  appId: '1:664875905615:web:c39d81fb6d8f8f2d09303a',
  measurementId: 'G-FETS6MKXT6'
}
const app = initializeApp(firebaseConfig)
const auth = getAuth()

$('.btn-login').on('click', async function () {
  const user = auth.currentUser

  if (!user) {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      $('.btn-login').html('Logout')
      // User signed in successfully
    } catch (error) {
      alert(error)
      // Handle errors here
    }
  } else {
    console.log('ahihi users', user)
  }
})