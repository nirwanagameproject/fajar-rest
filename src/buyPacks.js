import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getNftPack from './getNftPack.js'
import updateBalance from './updateBalance.js'

async function buyPacks(tempId,userKu,pricePacks,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  const action = {
      account: 'fajarmuhf123',
      name: 'buypack',
      authorization: [global.config.session.auth],
      data: {
        templateId: (tempId),
        newOwner : (userKu),
        quantity: pricePacks
      }
  }
  await global.config.session.transact({action})
  .then(function(response){
    if(response.processed.receipt.status==="executed"){
      onShowAlert("success","Pack successfully purchased.Transaction at "+response.processed.id,"Pack Bought",() => {getNftPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert);updateBalance(userKu,setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
    }
  })
  .catch(function (e) {
    console.log(e);
    onShowAlert("error","Pack failed to buy."+e,"Fail Bought",() => {onCloseAlert(setAlert)},setAlert);
  })
}
export default buyPacks;