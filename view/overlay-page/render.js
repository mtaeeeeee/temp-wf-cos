$(window).on('load', function () {
  //Insert cosplayer id into profile count
  $('.profile-vote-count-number')
    .addClass('cosplayerID-' + $('.cosplayerID').attr('id'))
    .empty()
    .append(cosplayerPhotoState[$('.cosplayerID').attr('id')].totalVoteCount)

  //Clear all content from the grid
  $('.cosplayer-latest').empty()

  //Search all cosplayer images and create pool img
  $('.cosplayer-temp-img').each(function () {
    let photoID = $(this).attr('src').split('/').pop().split('_', 1).join()

    $('.cosplayer-latest').append(
      `
            <a href="#" class="cosplayer-link w-inline-block openPhotoOverlay" style="background-image:url('` +
        $(this).attr('src') +
        `')" id="` +
        $(this).attr('src').split('/').pop().split('_', 1) +
        `" data-src="` +
        $(this).attr('src') +
        `" data-srcset="` +
        $(this).attr('srcset') +
        `">
                <div class="cosplay-link-inner-block">
                    <div class="vote-count-block">
                        <img src="https://uploads-ssl.webflow.com/6279c7595e56e5a596e3bafb/641d37ed93f70c7e6625413e_clapping.png" loading="lazy" alt="" class="vote-count-img">
                        <div class="vote-count-number photoID-` +
        photoID +
        `" >` +
        getPictureVoteCount($('.cosplayerID').attr('id'), photoID) +
        `</div>
                    </div>
                </div>
            </a>
        `
    )
    $(this).remove()
  })

  // Remove all the temp list
  $('body').find('.cosplayer-temp-list').remove()

  //Open photo
  $('.openPhotoOverlay').click(function () {
    //Unhide photo overlay layer
    $('#photo-overlay').removeClass('hidden')
    //Replace default image with idol img in photo overlay
    $('.photo-column')
      .children('img')
      .attr('src', $(this).attr('data-src'))
      .attr('srcset', $(this).attr('data-srcset'))
      .attr('loading', 'lazy')
    //Replace count number with idol img vote count
    $('.photo-vote-count').empty().append($(this).find('.vote-count-number').text())
    //Start voting overlay
    voting($(this).find('.vote-count-number').attr('class').split(' ')[1])
  })

  //Enable overlay close
  $('.close-photo-overlay-btn').click(function () {
    closePhotoOverlay()
  })

  //Open payment overlay
  $('.vote-now-btn').click(function () {
    showPaymentOverlay()
  })
})
