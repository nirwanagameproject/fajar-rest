import initilisasi from './initilisasi.js'
import unboxPacks from './unboxPacks.js'
import React from 'react'

async function getNftPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  global.config.session = await initilisasi(timerCooking);

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=packs"
  ).then((res) => res.json())
  .then((json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kButton=[];
    while(i<banyak){
      const assetId = (json["data"][i]["asset_id"]);
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let buttonNow = "buttonNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarityku = json["data"][i]["data"]["description"];
      let buttonku = <button onClick={() => {unboxPacks(assetId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>Unbox</button>;
      kNama.push(<td key={nameNow}>{namaku}</td>);
      kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}} alt={imgNftNow}></img></td>);
      kButton.push(<td key={buttonNow}>{buttonku}</td>);
      kRarity.push(<td key={rarityNow}>{rarityku}</td>);
      i++;
    }

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
    konten.push(<tr key="buttonNft">{kButton}</tr>);
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
    setStatusContent("Packs");
    setJudul(<h2>My Packs</h2>);
    
  });
}

export default getNftPack;