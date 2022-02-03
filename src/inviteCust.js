import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getCustomer from './getCustomer.js'
import updateBalance from './updateBalance.js'

async function inviteCust(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
	const action = {
	    account: 'fajarmuhf123',
	    name: 'invitecust',
	    authorization: [global.config.session.auth],
	    data: {
	      account : String(global.config.session.auth.actor)
	    }
	}
	await global.config.session.transact({action})
	.then(function(response){
	  if(response.processed.receipt.status==="executed"){
	    onShowAlert("success","Invite Customer successfully.Transaction at "+response.processed.id,"Invite Success",() => {getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
	  }
	})
	.catch(function (e) {
	  console.log(e);
	  onShowAlert("error","Invite Customer failed."+e,"Fail Invite",() => {onCloseAlert(setAlert)},setAlert);
	})
}
export default inviteCust;