import { apiUrl } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/utils/constant.js'
import { auth, firestore } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/services/firebase.js'
import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

const collectionId = '63ce4425b086d45e60078410'

const updateName = async name => {
  const user = auth.currentUser
  try {
    if (user && user.uid) {
      const userRef = doc(firestore, 'cosplayers', user.uid)
      await updateDoc(userRef, {
        name
      })
    }
  } catch (err) {
    console.log('ahihi error update name firebase', err)
  }
}

export const createNewCosplayer = data => {
  $.ajax({
    url: `${apiUrl}/collections/${collectionId}/items`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      fields: {
        _archived: false,
        _draft: false,
        ...data
      }
    }),
    success: function (data) {
      console.log(data)
      if (data.name) {
        updateName(data.name)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown)
    }
  })
}

export const updateCosplayerDetail = (itemId, data) => {
  $.ajax({
    url: `${apiUrl}/collections/${collectionId}/items/${itemId}`,
    method: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify({
      fields: {
        ...data
      }
    }),
    success: function (data) {
      console.log(data)
      if (data.name) {
        updateName(data.name)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown)
    }
  })
}

export const getCosplayerDetail = async uid => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${apiUrl}/collections/${collectionId}/items`,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data && data.items) {
          const cosplayer = data.items.find(cos => cos['cosplayer-id'] === uid)
          return resolve(cosplayer)
        }
        return resolve(null)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return reject(errorThrown)
      }
    })
  })
}
