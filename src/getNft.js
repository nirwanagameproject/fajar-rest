import initilisasi from './initilisasi.js'
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

async function getNft(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
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
    let kButton=[];
    while(i<banyak){
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let rarityku = json["data"][i]["data"]["rarity"];
      kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
      kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
      kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
      i++;
    }

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
    let kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama);}}>Load More</button></div>;
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
    setStatusContent("Food");
    setJudul(<h2>My Food</h2>);
  });
}
async function loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kImg,kRarity,kButton,kLoadButton,kNama){
  let konten=[];
  kNama=[];
  kImg=[];
  kRarity=[];
  
  global.config.pageNumber++;

  let hasil = await fetch("https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page="+global.config.pageNumber+"&limit="+global.config.tableLimit+"&order=desc&sort=transferred&owner="+(global.config.session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=food");
  let json = await hasil.json();
  var banyak = json["data"].length;
  var i=0;
  while(i<banyak){
    let nameNow = "nameNft"+i;
    let imgNftNow = "imageNft"+i;
    let rarityNow = "rarityNft"+i;
    let namaku = json["data"][i]["data"]["name"];
    let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
    let rarityku = json["data"][i]["data"]["rarity"];
    kNama.push(<ChildNama key={nameNow} keyName={nameNow} nama={namaku} />);
    kImg.push(<ChildImg key={imgNftNow} keyName={imgNftNow} nama={imgku} />);
    kRarity.push(<ChildRarity key={rarityNow} keyName={rarityNow} nama={rarityku} />);
    i++;
  }
  konten.push(<tr key="imageNft">{kImg}</tr>);
  konten.push(<tr key="rarityNft">{kRarity}</tr>);
    
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
  setStatusContent("Food");
  setJudul(<h2>My Food</h2>);
}
export default getNft;