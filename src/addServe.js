import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getCustomer from './getCustomer.js'

async function addServe(asset_id,template_id,name_food,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  const action = {
      account: 'atomicassets',
      name: 'transfer',
      authorization: [global.config.session.auth],
      data: {
        from : String(global.config.session.auth.actor),
        to : "fajarmuhf123",
        asset_ids : [asset_id],
        memo : "servecust "+id_slot+" "+asset_id
      }
  }
  await global.config.session.transact({action})
  .then(function(response){
    if(response.processed.receipt.status==="executed"){
      onShowAlert("success","Serving successfully.Transaction at "+response.processed.id,"Serving Success",() => {getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);onCloseAlert(setAlert)},setAlert);
    }
  })
  .catch(function (e) {
    console.log(e);
    onShowAlert("error","Serving failed."+e,"Fail Serving",() => {onCloseAlert(setAlert)},setAlert);
  })
}
export default addServe;