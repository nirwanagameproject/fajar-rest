import initilisasi from './initilisasi.js'
import repair from './repair.js'
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

async function getNftTool(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.pageNumber = 1;
  global.config.tableContent = [];
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
    let kLoadButton=[];
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
      if(tools_durability < max_durability){
        const buttonPush = <button onClick={() => {repair(req_asset_ids,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Repair</button>;
        kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
      }
      else{
        const buttonPush = "still working";
        kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
      }
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
    global.config.imgPacksL.push(kLoadButton);
    setPacksL(global.config.imgPacksL);
    setStatusContent("Tools");
    setJudul(<h2>My Tools</h2>);
  });
}
async function loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama){
  
  let konten=[];
  kNama=[];
  kImg=[];
  kRarity=[];
  kButton=[];
  
  global.config.pageNumber++;

  let hasil = await fetch(
    "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools"
  );
  let json = await hasil.json();
  var banyak = json["data"].length;
  var i=0;
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

    let nameNow = "nameNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let imgNftNow = "imageNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let rarityNow = "rarityNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let buttonNow = "buttonNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let durableNow = "durableNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let rarNow = "rarNft"+(i+(global.config.pageNumber-1)*global.config.tableLimit);
    let namaku = json["data"][i]["data"]["name"];
    let max_durability = json["data"][i]["data"]["durability"];
    let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
    let rarity = json["data"][i]["data"]["rarity"];
    const rarityku = <ul style={{paddingLeft:'0px',listStyleType:'none'}}>
                    <li key={durableNow}>durability : {tools_durability} / {max_durability}</li>
                    <li key={rarNow}>rarity : {rarity}</li>
                  </ul>;
    kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
    kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
    kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
    if(tools_durability < max_durability){
      const buttonPush = <button onClick={() => {repair(req_asset_ids,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Repair</button>;
      kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
    }
    else{
      const buttonPush = "still working";
      kButton.push(<ChildButton key={buttonNow} nama={buttonPush} keyName={buttonNow}/>);
    }
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
  setStatusContent("Tools");
  setJudul(<h2>My Tools</h2>);
}
export default getNftTool;