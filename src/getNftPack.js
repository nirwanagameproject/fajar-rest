import initilisasi from './initilisasi.js'
import unboxPacks from './unboxPacks.js'
import React,{memo} from 'react'

const ChildNama = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildImg = memo(({ nama, keyName }) => {
  return <td key={keyName} style={{textAlign:'center'}}><img src={nama} style={{width: '120px',height:'120px'}} alt={keyName}></img></td>;
});

const ChildRarity = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildButton = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

async function getNftPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.pageNumber = 1;
  global.config.imgPacksL = [];

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=packs"
  ).then((res) => res.json())
  .then((json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kButton=[];
    let kLoadButton=[];
    while(i<banyak){
      const assetId = (json["data"][i]["asset_id"]);
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let buttonNow = "buttonNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarityku = json["data"][i]["data"]["description"];
      const buttonku = <button onClick={() => {unboxPacks(assetId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>Unbox</button>;
      kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
      kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
      kButton.push(<ChildButton key={buttonNow} nama={buttonku} keyName={buttonNow}/>);
      kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
      i++;
    }
    kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama);}}>Load More</button></div>;

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
    konten.push(<tr key="buttonNft">{kButton}</tr>);
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
    if(banyak > 0){
      global.config.imgPacksL.push(kLoadButton);
    }
    setPacksL(global.config.imgPacksL);
    setStatusContent("Packs");
    setJudul(<h2>My Packs</h2>);
    
  });
}
async function loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama){
  let konten=[];
  kNama=[];
  kImg=[];
  kRarity=[];
  kButton=[];
  
  global.config.pageNumber++;

  let hasil = await fetch("https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=packs");
  let json = await hasil.json();
  var banyak = json["data"].length;
  var i=0;
  while(i<banyak){
    const assetId = (json["data"][i]["asset_id"]);
    let nameNow = "nameNft"+i;
    let imgNftNow = "imageNft"+i;
    let rarityNow = "rarityNft"+i;
    let buttonNow = "buttonNft"+i;
    let namaku = json["data"][i]["data"]["name"];
    let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
    let rarityku = json["data"][i]["data"]["description"];
    const buttonku = <button onClick={() => {unboxPacks(assetId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>Unbox</button>;
    kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
    kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
    kButton.push(<ChildButton key={buttonNow} nama={buttonku} keyName={buttonNow}/>);
    kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
    i++;
  }
  konten.push(<tr key="imageNft">{kImg}</tr>);
  konten.push(<tr key="rarityNft">{kRarity}</tr>);
  konten.push(<tr key="buttonNft">{kButton}</tr>);
    
  let tableNow = "tables"+global.config.pageNumber;
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
  if(banyak > 0){
    global.config.imgPacksL.push(kLoadButton);
  }
  
  setPacksL(global.config.imgPacksL);
  setStatusContent("Cuisine");
  setJudul(<h2>My Cuisine</h2>);
}
export default getNftPack;