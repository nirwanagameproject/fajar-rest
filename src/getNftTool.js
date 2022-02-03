import initilisasi from './initilisasi.js'
import repair from './repair.js'
import React from 'react'

async function getNftTool(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools"
  ).then((res) => res.json())
  .then(async (json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kButton=[];
    while(i<banyak){
      let req_asset_ids = json["data"][i]["asset_id"];
      let tools_durability = json["data"][i]["data"]["durability"];

      var hasil2 = await global.config.link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 3,
        json: true,
        key_type: "i64",
        limit: "1",
        lower_bound: parseInt(req_asset_ids),
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "tools",
        upper_bound: parseInt(req_asset_ids)
      });
      
      if(hasil2["rows"].length > 0){
        tools_durability = hasil2["rows"][0]["tools_durability"];
      }

      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let buttonNow = "buttonNft"+i;
      let durableNow = "durableNft"+i;
      let rarNow = "rarNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      let max_durability = json["data"][i]["data"]["durability"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarity = json["data"][i]["data"]["rarity"];
      let rarityku = <ul>
                      <li key={durableNow}>durability : {tools_durability} / {max_durability}</li>
                      <li key={rarNow}>rarity : {rarity}</li>
                    </ul>;
      kNama.push(<td key={nameNow}>{namaku}</td>);
      kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}} alt={imgNftNow}></img></td>);
      kRarity.push(<td key={rarityNow}>{rarityku}</td>);
      if(tools_durability < max_durability){
        kButton.push(<td key={buttonNow}><button onClick={() => {repair(req_asset_ids,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Repair</button></td>);
      }
      else{
        kButton.push(<td key={buttonNow}>still working</td>);  
      }
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
    setStatusContent("Tools");
    setJudul(<h2>My Tools</h2>);
  });
}
export default getNftTool;