import { apiUrl } from 'https://raw.githack.com/mtaeeeeee/temp-wf-cos/main/utils/constant.js'

const collectionId = '6425411a2ec9b8119bcd83fc'

export const createNewFan = data => {
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

export const updateFanDetail = (itemId, data) => {
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

export const getFanDetail = async account => {
  if (account && account.address) {
    const fanId = account.address

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${apiUrl}/collections/${collectionId}/items`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data && data.items) {
            const fan = data.items.find(cos => cos['wallet-address'] === fanId)
            return resolve(fan)
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
