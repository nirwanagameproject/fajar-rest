import initilisasi from './initilisasi.js'
import React from 'react'

async function getNftCuisine(setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
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
    while(i<banyak){
      let nameNow = "nameNft"+i;
      let imgNftNow = "imageNft"+i;
      let rarityNow = "rarityNft"+i;
      let energyNow = "energyNft"+i;
      let karboNow = "karboNft"+i;
      let proteinNow = "proteinNft"+i;
      let lemakNow = "lemakNft"+i;
      let namaku = json["data"][i]["data"]["name"];
      let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
      let energy = json["data"][i]["data"]["energy"];
      let karbo = json["data"][i]["data"]["karbohidrat"];
      let protein = json["data"][i]["data"]["protein"];
      let lemak = json["data"][i]["data"]["lemak"];
      kNama.push(<td key={nameNow}>{namaku}</td>);
      kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}} alt={imgNftNow}></img></td>);
      kRarity.push(
      <td key={rarityNow}>
        <ul>
          <li key={energyNow}>energy : {energy}</li>
          <li key={karboNow}>karbohidrat : {karbo}</li>
          <li key={proteinNow}>protein : {protein}</li>
          <li key={lemakNow}>lemak : {lemak}</li>
        </ul>
      </td>);
      i++;
    }

    konten.push(<tr key="imageNft">{kImg}</tr>);
    konten.push(<tr key="rarityNft">{kRarity}</tr>);
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
    setStatusContent("Cuisine");
    setJudul(<h2>My Cuisine</h2>);
  });
}
export default getNftCuisine;