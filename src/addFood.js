import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'

async function addFood(asset_id,template_id,name_food,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt){
  for(var mo=0;mo<global.config.foodSlot.length;mo++){
    if(global.config.foodSlot[mo]["asset_id"]+"" === asset_id+""){
        global.config.foodSlot.splice(mo, 1);
        evt.target.innerText = "Add";
        //getAddRaw(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
        return;        
    }
    if(global.config.foodSlot[mo]["template_id"]+"" === template_id+""){
      onShowAlert("error","Same raw material","Fail Add Raw",() => onCloseAlert(setAlert),setAlert);
      return;
    }
  }
  evt.target.innerText = "Remove";
  const assetnya = {"asset_id" : asset_id,"template_id" : template_id,"name_food": name_food};
  global.config.foodSlot.push(assetnya);
  //getAddRaw(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
}
export default addFood;