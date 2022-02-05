import initilisasi from './initilisasi.js'
import React,{memo} from 'react'
import addTools from './addTools.js'
import getCookingSlot from './getCookingSlot.js'

const ChildNama = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildRarity = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildImg = memo(({ nama, keyName }) => {
  return <td key={keyName} style={{textAlign:'center'}}><img src={nama} style={{width: '120px',height:'120px'}} alt={keyName}></img></td>;
});

const ChildButton = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

async function getAddTools(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.pageNumber = 1;
  global.config.imgPacksL = [];

  fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools"
  ).then((res) => res.json())
  .then(async (json) => {
    var banyak = json["data"].length;
    var i=0;
    let konten=[];
    let kNama=[];
    let kImg=[];
    let kRarity=[];
    let kButton=[];
    let kButtonAgree=[];
    let kLoadButton=[];
    while(i<banyak){
      let req_asset_ids = json["data"][i]["asset_id"];
      let tools_durability = json["data"][i]["data"]["durability"];
      let template_id = json["data"][i]["template"]["template_id"];
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

      const nameNow = "nameNft"+i;
      const imgNftNow = "imageNft"+i;
      const rarityNow = "rarityNft"+i;
      const buttonNow = "buttonNft"+i;
      const durableNow = "durableNft"+i;
      const rarNow = "rarNft"+i;
      const namaku = json["data"][i]["data"]["name"];
      const max_durability = json["data"][i]["data"]["durability"];
      const imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      const rarity = json["data"][i]["data"]["rarity"];
      const rarityku = <ul style={{paddingLeft:'0px',listStyleType:'none'}}>
                      <li key={durableNow}>durability : {tools_durability} / {max_durability}</li>
                      <li key={rarNow}>rarity : {rarity}</li>
                    </ul>;
      kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
      kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
      kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
      var tulisan = "Add";
      for(var mo=0;mo<global.config.toolsSlot.length;mo++){
        if(global.config.toolsSlot[mo]["asset_id"] === req_asset_ids){
          tulisan = "Remove";
        }
      }
      const buttonPush = <button onClick={(evt) => {addTools(req_asset_ids,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt);}}>{tulisan}</button>;
      kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
      i++;
    }
    kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama);}}>Load More</button></div>;
  
    kButtonAgree = (<div key="baCook" style={{marginTop:12}}><button onClick={() => {getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Pick up</button></div>);

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
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
  kButton=[];
  
  global.config.pageNumber++;

  let hasil = await fetch( "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools");
  let json = await hasil.json();
  var banyak = json["data"].length;
  var i=0;
  while(i<banyak){
    let req_asset_ids = json["data"][i]["asset_id"];
    let tools_durability = json["data"][i]["data"]["durability"];
    let template_id = json["data"][i]["template"]["template_id"];
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

    const nameNow = "nameNft"+i;
    const imgNftNow = "imageNft"+i;
    const rarityNow = "rarityNft"+i;
    const buttonNow = "buttonNft"+i;
    const durableNow = "durableNft"+i;
    const rarNow = "rarNft"+i;
    const namaku = json["data"][i]["data"]["name"];
    const max_durability = json["data"][i]["data"]["durability"];
    const imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
    const rarity = json["data"][i]["data"]["rarity"];
    const rarityku = <ul style={{paddingLeft:'0px',listStyleType:'none'}}>
                    <li key={durableNow}>durability : {tools_durability} / {max_durability}</li>
                    <li key={rarNow}>rarity : {rarity}</li>
                  </ul>;
    kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
    kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
    kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
    var tulisan = "Add";
    for(var mo=0;mo<global.config.toolsSlot.length;mo++){
      if(global.config.toolsSlot[mo]["asset_id"] === req_asset_ids){
        tulisan = "Remove";
      }
    }
    const buttonPush = <button onClick={(evt) => {addTools(req_asset_ids,template_id,namaku,id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,evt);}}>{tulisan}</button>;
    kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
    i++;
  }
  konten.push(<tr key="imageNft">{kImg}</tr>);
  konten.push(<tr key="rarityNft">{kRarity}</tr>);
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
export default getAddTools;