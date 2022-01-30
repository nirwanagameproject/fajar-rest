import initilisasi from './initilisasi.js'
import React from 'react'
import getAddRaw from './getAddRaw.js'
import getAddTools from './getAddTools.js'
import cookNow from './cookNow.js'
import slot from './img/slot.png'

async function getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);

  let kNama = [];
  kNama.push(<td key="rFood">Raw Food</td>);
  kNama.push(<td key="rTools">Tools</td>);
  let kSlot = [];
  let listRawFood = [];
  let listToolsFood = [];
  for(var mo=0;mo<global.config.foodSlot.length;mo++){
    const keyRawFood = "raw"+mo;
    const nameFoods = global.config.foodSlot[mo].name_food;
    listRawFood.push(<li key={keyRawFood} style={{color:"white"}}>{nameFoods}</li>);
  }
  for(mo=0;mo<global.config.toolsSlot.length;mo++){
    const keyRawTools = "tools"+mo;
    const nameTools = global.config.toolsSlot[mo].name_tools;
    listToolsFood.push(<li key={keyRawTools} style={{color:"white"}}>{nameTools}</li>);
  }
  let RawFood = <ul>{listRawFood}</ul>;
  let ToolsFood = <ul>{listToolsFood}</ul>;
  kSlot.push(<td key="gFood"><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'120px'}}>{RawFood}</div></td>);
  kSlot.push(<td key="gTools"><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'120px'}}>{ToolsFood}</div></td>);
  
  let kButton = [];
  kButton.push(<td key="bFood" onClick={() => {getAddRaw(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}><button>Add</button></td>);
  kButton.push(<td key="bTools" onClick={() => {getAddTools(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}><button>Add</button></td>);

  let kButtonAgree = [];
  kButtonAgree.push(<td key="baCook" colSpan="2" onClick={() => {cookNow(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}><button>Cook</button></td>);

  global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                    <thead>
                      <tr key="nameNft">
                        {kNama}
                      </tr>
                    </thead>
                    <tbody>
                      <tr key="slotNft">
                        {kSlot}
                      </tr> 
                      <tr key="buttonNft">
                        {kButton}
                      </tr>  
                      <tr key="buttonAgreeNft">
                        {kButtonAgree}
                      </tr>  
                    </tbody>
                    </table>;
    setPacksL(global.config.imgPacksL);
    setStatusContent("CookingSlot");
    setJudul(<h2>Pick Ingredients (Slot {id_slot})</h2>);
}

export default getCookingSlot;