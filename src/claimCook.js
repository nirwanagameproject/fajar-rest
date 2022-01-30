import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getCooking from './getCooking.js'
import updateBalance from './updateBalance.js'

async function claimCook(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
	const action = {
	    account: 'fajarmuhf123',
	    name: 'claimcook',
	    authorization: [global.config.session.auth],
	    data: {
	      account : String(global.config.session.auth.actor),
	      slot_id : id_slot
	    }
	}
	await global.config.session.transact({action})
	.then(function(response){
	  if(response.processed.receipt.status==="executed"){
	    onShowAlert("success","Cooking successfully.Transaction at "+response.processed.id,"Cooking Success",() => {getCooking(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
	  }
	})
	.catch(function (e) {
	  console.log(e);
	  onShowAlert("error","Cooking failed."+e,"Fail Cooking",() => {onCloseAlert(setAlert)},setAlert);
	})
}
export default claimCook;