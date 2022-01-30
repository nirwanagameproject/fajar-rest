import initilisasi from './initilisasi.js'
import React from 'react'
import addTools from './addTools.js'
import getCookingSlot from './getCookingSlot.js'

async function getAddTools(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+new String(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools"
  ).then((res) => res.json())
  .then((json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kButton=[];
    let kButtonAgree=[];
    while(i<banyak){
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let buttonNow = "buttonNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      const asset_id = json["data"][i]["asset_id"];
      const template_id = json["data"][i]["template"]["template_id"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarityku = json["data"][i]["data"]["rarity"];
      kNama.push(<td key={nameNow}>{namaku}</td>);
      kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>);
      kRarity.push(<td key={rarityNow}>{rarityku}</td>);
      var tulisan = "Add";
      for(var mo=0;mo<global.config.toolsSlot.length;mo++){
        if(global.config.toolsSlot[mo]["asset_id"] == asset_id){
          tulisan = "Remove";
        }
      }
      kButton.push(<td key={buttonNow}><button onClick={() => {addTools(asset_id,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>{tulisan}</button></td>);
      i++;
    }
    kButtonAgree.push(<td key="baCook" colSpan={banyak} onClick={() => {getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}><button>Pick up</button></td>);

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
    konten.push(<tr key="buttonNft">{kButton}</tr>);
    konten.push(<tr key="buttonAgreeNft">{kButtonAgree}</tr>);
    global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                    <thead>
                      <tr key="nameNft">
                        {kNama}
                      </tr>
                    </thead>
                    <tbody>
                      {konten}
                    </tbody>
                    </table>;
    setPacksL(global.config.imgPacksL);
    setStatusContent("AddFood");
    setJudul(<h2>Pick Raw Food</h2>);
  });
}

export default getAddTools;