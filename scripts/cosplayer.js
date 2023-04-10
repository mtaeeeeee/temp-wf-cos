import { auth, user } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/services/firebase.js'

console.log('ahihihi auth and user', auth, user)

const currentUser = auth.currentUser
if (currentUser) {
  console.log('ahihi currentUser', currentUser)
  $('#email').val('Tri Hoang')
}
const form = document.getElementById('cosplayer-profile-form')

form.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new FormData(form)

  const nickname = formData.get('nickname')
  const description = formData.get('description')
  const email = formData.get('email')
  // Add your code to handle the form submission here

  console.log('ahihii', nickname, description, email)
})
