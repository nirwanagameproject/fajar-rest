import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import updateBalance from './updateBalance.js'

async function deposit(koin,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  if(koin=="FRCOIN"){
    if (!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    { 
      const action = {
        account: 'fajarmftoken',
        name: 'transfer',
        authorization: [global.config.session.auth],
        data: {
          from: String(global.config.session.auth.actor),
          to : ("fajarmuhf123"),
          quantity: parseFloat(global.config.frcoin).toFixed(4)+" FRCOIN",
          memo: "deposit"
        }
      }
      const response = await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status=="executed"){
          onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert(setAlert)},setAlert);
      })
    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
  else if(koin=="FRGAS"){
    if (!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    { 
      const action = {
        account: 'fajarmftoken',
        name: 'transfer',
        authorization: [global.config.session.auth],
        data: {
          from: String(global.config.session.auth.actor),
          to : ("fajarmuhf123"),
          quantity: parseFloat(global.config.frgas).toFixed(4)+" FRGAS",
          memo: "deposit"
        }
    }
      const response = await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status=="executed"){
          onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert(setAlert)},setAlert);
      })

    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
  else if(koin=="FRENERGY"){
    if (!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    { 
      const action = {
        account: 'fajarmftoken',
        name: 'transfer',
        authorization: [global.config.session.auth],
        data: {
          from: String(global.config.session.auth.actor),
          to : ("fajarmuhf123"),
          quantity: parseFloat(global.config.frenergy).toFixed(4)+" FRENERG",
          memo: "deposit"
        }
      }
      const response = await global.config.session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status=="executed"){
          onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert(setAlert)},setAlert);
      })


    }
    else{
      onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert(setAlert)},setAlert);
    }
  }
}
export default deposit;