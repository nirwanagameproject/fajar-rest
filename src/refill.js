import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import updateBalance from './updateBalance.js'
import getRefillEnergy from './getRefillEnergy.js'
import getRefill from './getRefill.js'

async function refill(koin,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  if(koin+""==="FRGAS"){
    if (!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    { 
      const action = {
        account: 'fajarmuhf123',
        name: 'refill',
        authorization: [global.config.session.auth],
        data: {
          account: String(global.config.session.auth.actor),
          quantity: parseFloat(global.config.frgas).toFixed(4)+" FRGAS",
          memo: "refill gas"
        }
      }
      await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status+""==="executed"){
          onShowAlert("success","Refill successfully.Transaction at "+response.processed.id,"Refill success",() => {getRefill(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Refill failed."+e,"Fail Refill",() => {onCloseAlert(setAlert)},setAlert);
      })
    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
  else if(koin+""==="FRENERGY"){
    if (!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    { 
      const action = {
        account: 'fajarmuhf123',
        name: 'refill',
        authorization: [global.config.session.auth],
        data: {
          account: String(global.config.session.auth.actor),
          quantity: parseFloat(global.config.frenergy).toFixed(4)+" FRGAS",
          memo: "refill energy"
        }
      }
      await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status+""==="executed"){
          onShowAlert("success","Refill successfully.Transaction at "+response.processed.id,"Refill success",() => {getRefillEnergy(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Refill failed."+e,"Fail Refill",() => {onCloseAlert(setAlert)},setAlert);
      })
    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
}
export default refill;