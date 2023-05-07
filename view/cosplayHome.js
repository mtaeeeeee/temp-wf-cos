import 'https://rawcdn.githack.com/git-mangatoken/temp-wf-cos/v0.0.5/data/cosplayerList.js'
import {
  connect,
  watchAccount,
  getVotingContract,
  getTokenContract
} from 'https://storage.googleapis.com/cosplayer-voting.appspot.com/scripts/fan.js'

$(document).ready(async () => {
  $('#btn-connect-wallet').on('click', connect)

  watchAccount(async account => {
    if (account) {
      $('#btn-connect-wallet').text('View Wallet')

      const tokenAddress = '0x09Be10d52ce45EA4aF4B695A2e3dEaFD12d8755f'
      const votingAddress = '0x31b18667C33B77d730340CB3Fa7d9a2769317844'
      const tokenContract = await getTokenContract(tokenAddress)
      const votingContract = await getVotingContract(votingAddress)
      const allowance = await tokenContract.allowance(account.address, votingAddress)
      console.log('ahihi allowance', allowance)

      const shouldApprove = !allowance || +allowance.toString() <= 0

      $('.cosplayer-link').each(async function () {
        const cosplayerID = $(this).find('.cosplayerID').attr('id')
        const imageUrl = $(this).next().find('img').attr('src')
        const parent = $(this).parent()
        const approveBtn = parent.find('.home-btn-approve')
        const voteBtn = parent.find('.home-btn-vote')
        approveBtn.hide()
        voteBtn.hide()

        $(this).attr('style', 'background-image:url("' + imageUrl + '")')
        /* $(this).next().remove(); */

        if (shouldApprove) {
          voteBtn.hide()
          approveBtn.show()
        } else {
          voteBtn.show()
          approveBtn.hide()
        }

        const voteCount = await votingContract.votes(imageUrl)

        $(this).find('.vote-count-number').attr('id', cosplayerID).empty().append(voteCount.toString())

        approveBtn.on('click', async () => {
          if (tokenContract && votingContract) {
            const tx = await tokenContract.approve(votingAddress, '99999999999999999999')
            console.log('ahihi tx approve', tx)
            await tx.wait()
            approveBtn.hide()
            voteBtn.show()
          }
        })

        voteBtn.on('click', async () => {
          if (tokenContract && votingContract) {
            //upvote(imageURL: string, amount: number, cosplayerId: string, eventId: string)
            //on home page, eventId will be cosplayerId itself
            const tx = await votingContract.upvote(tokenAddress, imageUrl, 1, cosplayerID, cosplayerID)
            console.log('ahihi tx vote', tx)
            await tx.wait()
            console.log('ahihi imageUrl', imageUrl)
            const voteCount = await votingContract.votes(imageUrl)

            $(this).find('.vote-count-number').attr('id', cosplayerID).empty().append(voteCount.toString())
          }
        })
      })
    } else {
      $('#btn-connect-wallet').text('Connect Wallet')
    }
  })
})
