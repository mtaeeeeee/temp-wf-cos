import { auth } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/services/firebase.js'
import { apiUrl } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/utils/constant.js'

const collectionId = '63ce4425b086d45e60078410'

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
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown)
    }
  })
}

export const getCosplayerDetail = async () => {
  if (auth && auth.currentUser) {
    const cosplayerId = auth.currentUser.uid

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${apiUrl}/collections/${collectionId}/items`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data && data.items) {
            const cosplayer = data.items.find(cos => cos['cosplayer-id'] === cosplayerId)
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

  return Promise.resolve(null)
}
