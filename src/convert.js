import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import updateBalance from './updateBalance.js'
import getRefillEnergy from './getRefillEnergy.js'
import getRefill from './getRefill.js'

async function convert(koin,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  if(koin+""==="FRGAS"){
    if (!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    { 
      const action = {
        account: 'fajarmuhf123',
        name: 'swap',
        authorization: [global.config.session.auth],
        data: {
          account: String(global.config.session.auth.actor),
          quantity: parseFloat(global.config.frcoin).toFixed(4)+" FRCOIN",
          memo: "swap frcoin frgas"
        }
      }
      await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status+""==="executed"){
          onShowAlert("success","Convert successfully.Transaction at "+response.processed.id,"Convert success",() => {getRefill(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Convert failed."+e,"Fail Convert",() => {onCloseAlert(setAlert)},setAlert);
      })
    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
  else if(koin+""==="FRENERGY"){
    if (!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    { 
      const action = {
        account: 'fajarmuhf123',
        name: 'swap',
        authorization: [global.config.session.auth],
        data: {
          account: String(global.config.session.auth.actor),
          quantity: parseFloat(global.config.frcoin).toFixed(4)+" FRCOIN",
          memo: "swap frcoin frenergy"
        }
      }
      await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status+""==="executed"){
          onShowAlert("success","Convert successfully.Transaction at "+response.processed.id,"Convert success",() => {getRefillEnergy(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Convert failed."+e,"Fail Convert",() => {onCloseAlert(setAlert)},setAlert);
      })
    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
}
export default convert;