import initilisasi from './initilisasi.js'
import React from 'react'
import addServe from './addServe.js'
import getCustomer from './getCustomer.js'

async function getAddServe(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=cuisine"
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
      let rarityku = json["data"][i]["data"]["energy"];
      kNama.push(<td key={nameNow}>{namaku}</td>);
      kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}} alt={imgNftNow}></img></td>);
      kRarity.push(<td key={rarityNow}>{rarityku}</td>);
      
      kButton.push(<td key={buttonNow}><button onClick={() => {addServe(asset_id,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Pick</button></td>);
      i++;
    }
    kButtonAgree.push(<td key="baCook" colSpan={banyak} onClick={() => {getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}><button>Back</button></td>);

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
    setStatusContent("AddServe");
    setJudul(<h2>Pick Cuisine Food (Slot {id_slot})</h2>);
  });
}

export default getAddServe;