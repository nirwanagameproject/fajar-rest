import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'

async function addTools(asset_id,template_id,name_tools,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt){
  for(var mo=0;mo<global.config.toolsSlot.length;mo++){
    if(global.config.toolsSlot[mo]["asset_id"]+"" === asset_id+""){
        global.config.toolsSlot.splice(mo, 1);
        evt.target.innerText = "Add";
        //getAddTools(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
        return;        
    }
    if(global.config.toolsSlot[mo]["template_id"]+"" === template_id+""){
      onShowAlert("error","Same raw material","Fail Add Tools",() => onCloseAlert(setAlert),setAlert);
      return;
    }
  }
  const assetnya = {"asset_id" : asset_id,"template_id" : template_id,"name_tools": name_tools};
  global.config.toolsSlot.push(assetnya);
  evt.target.innerText = "Remove";
  //getAddTools(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
}
export default addTools;