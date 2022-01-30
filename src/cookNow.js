import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getCooking from './getCooking.js'
import updateBalance from './updateBalance.js'

async function cookNow(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  let req_food_temp_id = [];
  let req_food_asset_id = [];
  for(var mo=0;mo<global.config.foodSlot.length;mo++){
    req_food_temp_id.push(global.config.foodSlot[mo].template_id);
    req_food_asset_id.push(global.config.foodSlot[mo].asset_id);
  }
  let req_tools_temp_id = [];
  let req_tools_asset_id = [];
  for(mo=0;mo<global.config.toolsSlot.length;mo++){
    req_tools_temp_id.push(global.config.toolsSlot[mo].template_id);
    req_tools_asset_id.push(global.config.toolsSlot[mo].asset_id);
  }
  let req_asset_id = [];
  for(mo=0;mo<req_food_asset_id.length;mo++){
    req_asset_id.push(req_food_asset_id[mo]);
  }
  for(mo=0;mo<req_tools_asset_id.length;mo++){
    req_asset_id.push(req_tools_asset_id[mo]);
  }
  const action = {
      account: 'atomicassets',
      name: 'transfer',
      authorization: [global.config.session.auth],
      data: {
        from : String(global.config.session.auth.actor),
        to : "fajarmuhf123",
        asset_ids : req_asset_id,
        memo : "cooking "+id_slot+" "+req_food_temp_id+" "+req_food_asset_id+" "+req_tools_temp_id+" "+req_tools_asset_id
      }
  }
    const response = await global.config.session.transact({action})
    .then(function(response){
      if(response.processed.receipt.status=="executed"){
        onShowAlert("success","Cooking successfully.Transaction at "+response.processed.id,"Cooking Success",() => {getCooking(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);onCloseAlert(setAlert)},setAlert);
      }
    })
    .catch(function (e) {
      console.log(e);
      onShowAlert("error","Cooking failed."+e,"Fail Cooking",() => {onCloseAlert(setAlert)},setAlert);
    })
}

export default cookNow;