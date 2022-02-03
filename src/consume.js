import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getNftCuisine from './getNftCuisine.js'
import updateBalance from './updateBalance.js'

async function consume(asset_id,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  	let req_asset_ids = [];
  	req_asset_ids.push(asset_id);

	const action = {
	    account: 'atomicassets',
	    name: 'transfer',
	    authorization: [global.config.session.auth],
	    data: {
	      from : String(global.config.session.auth.actor),
	      to : "fajarmuhf123",
	      asset_ids : req_asset_ids,
	      memo : "consume "+asset_id
	    }
	}
	await global.config.session.transact({action})
	.then(function(response){
	  if(response.processed.receipt.status==="executed"){
	    onShowAlert("success","Consume successfully.Transaction at "+response.processed.id,"Consume Success",() => {getNftCuisine(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
	  }
	})
	.catch(function (e) {
	  console.log(e);
	  onShowAlert("error","Consume failed."+e,"Fail Consume",() => {onCloseAlert(setAlert)},setAlert);
	})
}
export default consume;