import initilisasi from './initilisasi.js'
import React,{memo} from 'react'
import addFood from './addFood.js'
import getCookingSlot from './getCookingSlot.js'

const ChildNama = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildRarity = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildGas = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildImg = memo(({ nama, keyName }) => {
  return <td key={keyName} style={{textAlign:'center'}}><img src={nama} style={{width: '120px',height:'120px'}} alt={keyName}></img></td>;
});

const ChildButton = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

async function getAddRaw(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.pageNumber = 1;
  global.config.imgPacksL = [];

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=food"
  ).then((res) => res.json())
  .then((json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kGasCons=[];
    let kButton=[];
    while(i<banyak){
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let buttonNow = "buttonNft"+i;
      let gasNow = "gasNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      const asset_id = json["data"][i]["asset_id"];
      const template_id = json["data"][i]["template"]["template_id"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarityku = json["data"][i]["data"]["rarity"];
      let gasku = "gas cosumption : "+json["data"][i]["data"]["gas_cosumption"];
      kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
      kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
      kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
      kGasCons.push(<ChildGas key={gasNow} keyName={gasNow} nama={gasku} />);
      var tulisan = "Add";
      for(var mo=0;mo<global.config.foodSlot.length;mo++){
        if(global.config.foodSlot[mo]["asset_id"] === asset_id){
          tulisan = "Remove";
        }
      }
      const buttonPush = <button onClick={(evt) => {addFood(asset_id,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt);}}>{tulisan}</button>;
      kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
      i++;
    }
    const kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama,id_slot);}}>Load More</button></div>;
    const kButtonAgree = (<div key="baCook" style={{marginTop:12}}><button onClick={() => {getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Pick up</button></div>);

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
    konten.push(<tr key="gasNft">{kGasCons}</tr>);
    konten.push(<tr key="buttonNft">{kButton}</tr>);
    if(banyak > 0){
      let tableNow = "tables"+global.config.pageNumber;
      global.config.imgPacksL.push(<table key={tableNow} align='center' style={{marginTop: '20px'}} >
                      <thead>
                        <tr key="nameNft">
                          {kNama}
                        </tr>
                      </thead>
                      <tbody>
                        {konten}
                      </tbody>
                      </table>);
    }
    global.config.imgPacksL.push(kButtonAgree);
    if(banyak > 0){
     global.config.imgPacksL.push(kLoadButton);
    }
    setPacksL(global.config.imgPacksL);
    setStatusContent("AddFood");
    setJudul(<h2>Pick Raw Food</h2>);
  });
}
async function loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama,id_slot){
  let konten=[];
  kNama=[];
  kImg=[];
  kRarity=[];
  let kGasCons=[];
  kButton=[];
  
  global.config.pageNumber++;

  let hasil = await fetch( "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=food");
  let json = await hasil.json();
  var banyak = json["data"].length;
  var i=0;
  while(i<banyak){
    let nameNow = "nameNft"+i;
    let imgNftNow = "imageNft"+i;
    let rarityNow = "rarityNft"+i;
    let buttonNow = "buttonNft"+i;
    let gasNow = "gasNft"+i;
    let namaku = json["data"][i]["data"]["name"];
    const asset_id = json["data"][i]["asset_id"];
    const template_id = json["data"][i]["template"]["template_id"];
    let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
    let rarityku = json["data"][i]["data"]["rarity"];
    let gasku = "gas cosumption : "+json["data"][i]["data"]["gas_cosumption"];
    kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
    kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
    kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
    kGasCons.push(<ChildGas key={gasNow} keyName={gasNow} nama={gasku} />);
    var tulisan = "Add";
    for(var mo=0;mo<global.config.foodSlot.length;mo++){
      if(global.config.foodSlot[mo]["asset_id"] === asset_id){
        tulisan = "Remove";
      }
    }
    const buttonPush = <button onClick={(evt) => {addFood(asset_id,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt);}}>{tulisan}</button>;
    kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
    i++;
  }
  konten.push(<tr key="imageNft">{kImg}</tr>);
  konten.push(<tr key="buttonNft">{kButton}</tr>);

  kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama);}}>Load More</button></div>;
  const kButtonAgree = (<div key="baCook" style={{marginTop:12}}><button onClick={() => {getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Pick up</button></div>);
  
  let tableNow = "tables"+global.config.pageNumber;
  global.config.imgPacksL.pop();
  global.config.imgPacksL.pop();
  if(banyak > 0){
    global.config.imgPacksL.push(<table key={tableNow} align='center' style={{marginTop: '20px'}} >
      <thead>
        <tr key="nameNft">
          {kNama}
        </tr>
      </thead>
      <tbody>
        {konten}
      </tbody>
      </table>);
  }
  global.config.imgPacksL.push(kButtonAgree);
  if(banyak > 0){
    global.config.imgPacksL.push(kLoadButton);
  }
  
  setPacksL(global.config.imgPacksL);
  setStatusContent("AddServe");
  setJudul(<h2>Pick Cuisine Food (Slot {id_slot})</h2>);
}
export default getAddRaw;