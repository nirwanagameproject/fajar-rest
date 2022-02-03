import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getNftTool from './getNftTool.js'
import updateBalance from './updateBalance.js'

async function repair(asset_id,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  	console.log(asset_id);
  	const action = {
	    account: 'fajarmuhf123',
	    name: 'repairtools',
	    authorization: [global.config.session.auth],
	    data: {
	      account : String(global.config.session.auth.actor),
	      asset_id : asset_id
	    }
	}

	await global.config.session.transact({action})
	.then(function(response){
	  if(response.processed.receipt.status==="executed"){
	    onShowAlert("success","Repair successfully.Transaction at "+response.processed.id,"Repair Success",() => {getNftTool(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
	  }
	})
	.catch(function (e) {
	  console.log(e);
	  onShowAlert("error","Repair failed."+e,"Fail Repair",() => {onCloseAlert(setAlert)},setAlert);
	})
}
export default repair;