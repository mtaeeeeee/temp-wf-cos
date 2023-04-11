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
