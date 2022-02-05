import initilisasi from './initilisasi.js'
import claimPacks from './claimPacks.js'
import React from 'react'

async function getNftUnclaimPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  global.config.session = await initilisasi(timerCooking);

  var json = await global.config.link.client.v1.chain.get_table_rows({
      code: "atomicpacksx",
      index_position: 2,
      json: true,
      key_type: "name",
      limit: global.config.tableLimit,
      lower_bound: (global.config.session.auth.actor),
      reverse: false,
      scope: "atomicpacksx",
      show_payer: false,
      table: "unboxpacks",
      upper_bound: (global.config.session.auth.actor)
    });
  var banyak = json["rows"].length;
  var i=0;
  let konten=[];
  let kNama=[];
  let kImg=[];
  let kButton=[];
  let kRarity=[];
  while(i<banyak){
    let nameNow = "nameNft"+i;
    let imgNftNow = "imageNft"+i;
    let rarityNow = "rarityNft"+i;
    let buttonNow = "buttonNft"+i;
    let assetId = json["rows"][i]["pack_asset_id"];

    const cari = await fetch("https://aa-testnet.neftyblocks.com/atomicassets/v1/assets?page=1&ids="+assetId);
    const json2 = await cari.json();
    
    let namaku = json2["data"][0]["data"]["name"];
    let imgku = 'https://ipfs.io/ipfs/'+json2["data"][0]["data"]["img"];
    let rarityku = json2["data"][0]["data"]["description"];
    const assetIds = assetId;
    let buttonku = <button onClick={() => claimPacks(assetIds,setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}>Claim</button>;
    console.log(namaku);
    kNama.push(<td key={nameNow}>{namaku}</td>);
    kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}} alt={imgNftNow}></img></td>);
    kRarity.push(<td key={rarityNow}>{rarityku}</td>);
    kButton.push(<td key={buttonNow}>{buttonku}</td>);
    konten=[];
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
    setStatusContent("UnclaimPacks");
    setJudul(<h2>Unclaim Packs</h2>);
    i++;
  }
  if(banyak===0){
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
    setStatusContent("UnclaimPacks");
    setJudul(<h2>Unclaim Packs</h2>);
  }
}

export default getNftUnclaimPack;