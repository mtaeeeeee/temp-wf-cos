import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

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
const firestore = getFirestore(app)

let user = auth.currentUser

if (user) {
  $('.btn-login').html('Logout')
} else {
  $('.btn-login').html('Login')
}

auth.onAuthStateChanged(user => {
  if (user) {
    $('.btn-login').html('Logout')
  } else {
    $('.btn-login').html('Login')
  }
})

$('.btn-login').on('click', async function () {
  let user = auth.currentUser
  if (!user) {
    const provider = new GoogleAuthProvider()
    try {
      const res = await signInWithPopup(auth, provider)
      const userRef = doc(firestore, 'cosplayers', res.user?.uid)
      const detail = await getDoc(userRef)
      if (!detail?.data()?.uid) {
        await setDoc(userRef, {
          uid: res.user?.uid
        })
      }
      $('.btn-login').html('Logout')
      // User signed in successfully
    } catch (error) {
      alert(error)
      // Handle errors here
    }
  } else {
    signOut(auth)
  }
})

export { auth, firestore }
