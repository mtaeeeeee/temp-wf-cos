const collectionId = '63ce4425b086d45e60078410'
const apiHost = 'http://localhost:5001/cosplayer-voting/us-central1/webflow/api'

export const createNewCosplayer = data => {
  const apiUrl = `${apiHost}/collections/${collectionId}/items`

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      fields: {
        _archived: false,
        _draft: false,
        ...data
      }
    })
  })
    .then(response => {
      if (response.ok) {
        console.log('ahihi created', response)
        // Handle success
      } else {
        console.log('ahihi error created')
        // Handle error
      }
    })
    .catch(error => {
      // Handle error
    })
}
