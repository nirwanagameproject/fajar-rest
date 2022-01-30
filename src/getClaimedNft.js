import initilisasi from './initilisasi.js'
import React from 'react'

async function getClaimedNft(trxId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  global.config.session = await initilisasi(timerCooking);

  let banyakAksi = 0;
  let json;
  while(banyakAksi < 3){
    const res = await fetch(
      "https://testnet.waxsweden.org/v2/history/get_transaction?id="+trxId
    );

    json = await res.json();
    
    banyakAksi = json["actions"].length;
  }

  let assetId = json["actions"][2]["act"]["data"]["asset_id"];

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicassets/v1/assets?page=1&ids="+assetId
  ).then((res) => res.json())
  .then((json2) => {
    let namaku = json2["data"][0]["data"]["name"];
    let imgku = 'https://ipfs.io/ipfs/'+json2["data"][0]["data"]["img"];
    let rarityku = json2["data"][0]["data"]["rarity"];

    let namaClaim = <td>{namaku}</td>; 
    let imgClaim = <td><img src={imgku} style={{width: '120px',height:'120px'}} alt="reward"></img></td>;
    let rarityClaim = <td>{rarityku}</td>;
    global.config.imgPacksL = 
              <table align="center" style={{marginTop: '20px'}} >
                <thead>
                  <tr>
                    {namaClaim}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {imgClaim}
                  </tr>
                  <tr>
                    {rarityClaim}
                  </tr>
                </tbody>
              </table>;
    setPacksL(global.config.imgPacksL);
    setStatusContent("Cooking");
    setJudul(<h2>Cooking</h2>);
  });
}
export default getClaimedNft;