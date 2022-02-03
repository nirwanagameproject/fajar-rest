import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getCustomer from './getCustomer.js'
import updateBalance from './updateBalance.js'

async function claimCust(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  const action = {
      account: 'fajarmuhf123',
      name: 'claimcust',
      authorization: [global.config.session.auth],
      data: {
        account : String(global.config.session.auth.actor),
        slot_id : id_slot
      }
  }
  await global.config.session.transact({action})
  .then(function(response){
    if(response.processed.receipt.status==="executed"){
      onShowAlert("success","Collect successfully.Transaction at "+response.processed.id,"Collect Success",() => {getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
    }
  })
  .catch(function (e) {
    console.log(e);
    onShowAlert("error","Collect failed."+e,"Fail Collect",() => {onCloseAlert(setAlert)},setAlert);
  })
}
export default claimCust;