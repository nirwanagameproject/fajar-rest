import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import * as waxjs from "@waxio/waxjs/dist";
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import {useEffect,useState} from 'react';
import Response from './Response.js'
import Alert from 'react-popup-alert'
function App() {
  const identifier = 'example';
  let session;
  let buttonL;
  let imgPacksL;
  const [loadSession,setLoadSession] = useState(false);
  const [userAccount,setUserAccount] = useState('No wallet linked');
  const [balanceAccount,setBalanceAccount] = useState('');
  const [packsL,setPacksL] = useState('');
  const [statusContent,setStatusContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

  useEffect(() => {
      setIsLoaded(true);
  }, []);

  const transport = new AnchorLinkBrowserTransport();
  // initialize the link
  const link = new AnchorLink({
      transport,
      chains: [{
          chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
          nodeUrl: 'https://testnet.waxsweden.org',
      }]
  });
  
  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert() {
    setAlert({
      header: '',
      type: '',
      text: '',
      show: false,
      onCloseAlert:onCloseAlert
    })
  }

  function onShowAlert(type,tulis,judul,fungsiTutup) {
    setAlert({
      header: judul,
      type: type,
      text: tulis,
      show: true,
      onCloseAlert : fungsiTutup
    })
  }

  async function buyPacks(tempId,userKu){
    const action = {
        account: 'fajarmftoken',
        name: 'transfer',
        authorization: [session.auth],
        data: {
          from: (userKu),
          to : ("fajarmuhf123"),
          quantity: '8.0000 FAJAR',
          memo: "buy packs "+tempId
        }
    }
      const response = await session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status=="executed"){
          onShowAlert("success","Pack successfully purchased.Transaction at "+response.processed.id,"Pack Bought",() => {getNftPack();onCloseAlert()});
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Pack failed to buy."+e,"Fail Bought",() => {onCloseAlert()});
      })
      
  }

  async function getNftPack(){

    session = await link.restoreSession(identifier);

    fetch(
      "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+new String(session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=packs"
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
        let assetId = (json["data"][i]["asset_id"]);
        let nameNow = "nameNft"+i;
        let imgNftNow = "imageNft"+i;
        let rarityNow = "rarityNft"+i;
        let buttonNow = "buttonNft"+i;
        let namaku = json["data"][i]["data"]["name"];
        let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
        let rarityku = json["data"][i]["data"]["description"];
        let buttonku = <button onClick={() => unboxPacks(assetId)}>Unbox</button>;
        kNama.push(<td key={nameNow}>{namaku}</td>);
        kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>);
        kButton.push(<td key={buttonNow}>{buttonku}</td>);
        kRarity.push(<td key={rarityNow}>{rarityku}</td>);
        i++;
      }

      konten.push(<tr key="imageNft">{kImg}</tr>);
      konten.push(<tr key="rarityNft">{kRarity}</tr>);
      konten.push(<tr key="buttonNft">{kButton}</tr>);
      imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                      <thead>
                        <tr key="nameNft">
                          {kNama}
                        </tr>
                      </thead>
                      <tbody>
                        {konten}
                      </tbody>
                      </table>;
      setPacksL(imgPacksL);
      setStatusContent("Packs");
      
    });
  }

  async function unboxPacks(assetId){
    session = await link.restoreSession(identifier);
    const action = {
        account: 'atomicassets',
        name: 'transfer',
        authorization: [session.auth],
        data: {
          asset_ids : [assetId],
          from: (session.auth.actor),
          memo: "unbox",
          to: "atomicpacksx"
        }
    }
    const response = await session.transact({action})
    .then(function(response){
      if(response.processed.receipt.status=="executed"){
        onShowAlert("success","Pack successfully unbox.Transaction at "+response.processed.id,"Pack Unboxed",() => {getNftUnclaimPack();onCloseAlert()});
      }
    })
    .catch(function (e) {
      console.log(e);
      onShowAlert("error","Pack failed to unbox."+e,"Fail Unboxed",() => onCloseAlert());
    })
  }

  async function claimPacks(assetId){
    session = await link.restoreSession(identifier);
    const action = {
        account: 'atomicpacksx',
        name: 'claimunboxed',
        authorization: [session.auth],
        data: {
          origin_roll_ids: [0],
          pack_asset_id : assetId
        }
    }
    const response = await session.transact({action})
    .then(function(response){
      if(response.processed.receipt.status=="executed"){
        onShowAlert("success","Pack successfully claimed.Transaction at "+response.processed.id,"Pack Claimed",() => {getNft();onCloseAlert()});
      }
    })
    .catch(function (e) {
      console.log(e);
      onShowAlert("error","Pack failed to claim."+e,"Fail Claimed",() => onCloseAlert());
    })
  }

  async function getNftUnclaimPack(){
    session = await link.restoreSession(identifier);

    var json = await link.client.v1.chain.get_table_rows({
        code: "atomicpacksx",
        index_position: 2,
        json: true,
        key_type: "name",
        limit: 10,
        lower_bound: new String(session.auth.actor),
        reverse: false,
        scope: "atomicpacksx",
        show_payer: false,
        table: "unboxpacks",
        upper_bound: new String(session.auth.actor)
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

      fetch(
      "https://aa-testnet.neftyblocks.com/atomicassets/v1/assets?page=1&ids="+assetId
      ).then((res) => res.json())
      .then((json2) => {
        let namaku = json2["data"][0]["data"]["name"];
        let imgku = 'https://ipfs.io/ipfs/'+json2["data"][0]["data"]["img"];
        let rarityku = json2["data"][0]["data"]["description"];
        let buttonku = <button onClick={() => claimPacks(assetId)}>Claim</button>;
        console.log(namaku);
        kNama.push(<td key={nameNow}>{namaku}</td>);
        kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>);
        kRarity.push(<td key={rarityNow}>{rarityku}</td>);
        kButton.push(<td key={buttonNow}>{buttonku}</td>);
        konten=[];
        konten.push(<tr key="imageNft">{kImg}</tr>);
        konten.push(<tr key="rarityNft">{kRarity}</tr>);
        konten.push(<tr key="buttonNft">{kButton}</tr>);
        imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                        <thead>
                          <tr key="nameNft">
                            {kNama}
                          </tr>
                        </thead>
                        <tbody>
                          {konten}
                        </tbody>
                        </table>;
        setPacksL(imgPacksL);
        setStatusContent("UnclaimPacks");
      });
      i++;
    }
    if(banyak==0){
      konten.push(<tr key="imageNft">{kImg}</tr>);
      konten.push(<tr key="rarityNft">{kRarity}</tr>);
      konten.push(<tr key="buttonNft">{kButton}</tr>);
      imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                      <thead>
                        <tr key="nameNft">
                          {kNama}
                        </tr>
                      </thead>
                      <tbody>
                        {konten}
                      </tbody>
                      </table>;
      setPacksL(imgPacksL);
      setStatusContent("UnclaimPacks");
    }
  }


  async function getNft(){
    session = await link.restoreSession(identifier);

    fetch(
      "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+new String(session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=food"
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
        let namaku = json["data"][i]["data"]["name"];
        let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
        let rarityku = json["data"][i]["data"]["description"];
        kNama.push(<td key={nameNow}>{namaku}</td>);
        kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>);
        kRarity.push(<td key={rarityNow}>{rarityku}</td>);
        i++;
      }

      konten.push(<tr key="imageNft">{kImg}</tr>);
      konten.push(<tr key="rarityNft">{kRarity}</tr>);
      imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                      <thead>
                        <tr key="nameNft">
                          {kNama}
                        </tr>
                      </thead>
                      <tbody>
                        {konten}
                      </tbody>
                      </table>;
      setPacksL(imgPacksL);
      setStatusContent("Food");
    });
  }

  async function getNftTool(){
    session = await link.restoreSession(identifier);

    fetch(
      "https://aa-testnet.neftyblocks.com/atomicmarket/v1/assets?page=1&limit=10&order=desc&sort=transferred&owner="+new String(session.auth.actor)+"&collection_name=fajarmuhf123&schema_name=tools"
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
        let namaku = json["data"][i]["data"]["name"];
        let imgku = 'https://ipfs.io/ipfs/'+json["data"][i]["data"]["img"];
        let rarityku = json["data"][i]["data"]["description"];
        kNama.push(<td key={nameNow}>{namaku}</td>);
        kImg.push(<td key={imgNftNow}><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>);
        kRarity.push(<td key={rarityNow}>{rarityku}</td>);
        i++;
      }

      konten.push(<tr key="imageNft">{kImg}</tr>);
      konten.push(<tr key="rarityNft">{kRarity}</tr>);
      imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                      <thead>
                        <tr key="nameNft">
                          {kNama}
                        </tr>
                      </thead>
                      <tbody>
                        {konten}
                      </tbody>
                      </table>;
      setPacksL(imgPacksL);
      setStatusContent("Tools");
      
    });
  }

  async function getPacksContent(namaPack,gambarPacks,descPacks,idPacks){
    session = await link.restoreSession(identifier);

    var hasil = await link.client.v1.chain.get_table_rows({
      code: "fajarmuhf123",
      index_position: 1,
      json: true,
      key_type: "",
      limit: "100",
      lower_bound: null,
      reverse: false,
      scope: "fajarmuhf123",
      show_payer: false,
      table: "priceitem",
      upper_bound: null
    });

    let pricePacks;

    for(var i=0;i<hasil["rows"].length;i++){
      if(namaPack == hasil["rows"][i]["nm"]){
        pricePacks = hasil["rows"][i]["price"];
      }
    }


    imgPacksL = 
                <table align="center" style={{marginTop: '20px'}} >
                  <thead>
                    <tr>
                      <td>{namaPack}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><img src={gambarPacks} style={{width: '120px',height:'120px'}}></img></td>
                    </tr>
                    <tr>
                      <td>{descPacks}</td>
                    </tr>
                    <tr>
                      <td>{pricePacks}</td>
                    </tr>
                    <tr>
                      <td><button onClick={() => buyPacks(idPacks,(session.auth.actor))}>Buy Now</button></td>
                    </tr>
                  </tbody>
                </table>;
    setPacksL(imgPacksL);
  }

  async function getPacks(){
    session = await link.restoreSession(identifier);

    fetch(
      "https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=packs&limit=1000")
    .then((res) => res.json())
    .then((json) => {
        let descPacks = (json["data"][1]["immutable_data"]["description"]);
        let namePacks = (json["data"][1]["name"]);
        let idPacks = (json["data"][1]["template_id"]);
        let gambarPacks = 'https://ipfs.io/ipfs/'+(json["data"][1]["immutable_data"]["img"]);

        let pricePacks = getPacksContent(namePacks,gambarPacks,descPacks,idPacks);


        setStatusContent("BuyPacks");
    })
  }

  async function coba(userStr){
    var hasil = await link.client.v1.chain.get_table_rows({
        code: "fajarmftoken",
        index_position: 1,
        json: true,
        key_type: "",
        limit: "100",
        lower_bound: null,
        reverse: false,
        scope: userStr,
        show_payer: false,
        table: "accounts",
        upper_bound: null
      });
    let frcoin = "0.0000";
    let frgas = "0.0000";
    let frenergy = "0.0000";
    for(var i=0;i<hasil["rows"].length;i++){
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRCOIN"){
        frcoin=hasil["rows"][i]["balance"].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRGAS"){
        frgas=hasil["rows"][i]["balance"].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRGAS"){
        frenergy=hasil["rows"][i]["balance"].split(" ")[0];
      }    
    }
    let bal = ", FRCOIN = "+frcoin+", FRGAS = "+frgas+", FRENERGY = "+frenergy;
    setBalanceAccount(bal);
      
  }
  async function restoreSession(){
    link.restoreSession(identifier).then((result) => {
        session = result;
        if (session) {
            setUserAccount(String(session.auth.actor));
            if(!loadSession){
              coba(String(session.auth.actor));
              getPacks();
            }
            setLoadSession(true);
        }
    });
  }
  async function logout(){
    session = await link.restoreSession(identifier);
    try{
      session.remove();
      setUserAccount('No wallet linked');
      setLoadSession(false);
      setBalanceAccount("");
      setPacksL('');
    }catch(err){

      console.log(err);
    }
  }

  function updatemenu() {
    if (document.getElementById('responsive-menu').checked == true) {
      document.getElementById('menu').style.borderBottomRightRadius = '0';
      document.getElementById('menu').style.borderBottomLeftRadius = '0';
    }else{
      document.getElementById('menu').style.borderRadius = '10px';
    }
  }
  
  async function login(){
    try{
      link.login(identifier).then((result) => {
          session = result.session
          restoreSession();
      });
    }catch(err){

    }
    /*const wax = new waxjs.WaxJS({
      rpcEndpoint: 'https://testnet.waxsweden.org'
    });
    try{
      const userku = await wax.login();
      const pubKeys = wax.pubKeys;
      setUserAccount(String(userku));
      setLoadSession(true);
      coba(String(userku));
    }catch(err){

    }*/
  }
  useEffect(() => {
    if (isLoaded) {
      restoreSession();
    }
  }, [isLoaded]);
      
  if (loadSession) {
      buttonL = false;
  } else {
      buttonL = <button onClick={login}>Login</button>;
  }
  return (
    <div className="App">
      <Alert
          header={alert.header}
          btnText={'Close'}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={alert.onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        />
      <h1>Fajar Crypto Restauran</h1>
      {loadSession
        ? <nav id='menu'>
        <input type='checkbox' id='responsive-menu' onClick={updatemenu} /><label></label>
        <ul>
          <li><a onClick={getPacks}>Home</a></li>
          <li><a className='dropdown-arrow'>My NFT</a>
            <ul className='sub-menus'>
              <li><a onClick={getNftPack}>My Packs</a></li>
              <li><a onClick={getNft}>My Raw Material</a></li>
              <li><a onClick={getNftTool}>My Tools</a></li>
            </ul>
          </li>
          <li><a onClick={getPacks}>Buy Packs</a></li>
          <li><a onClick={logout}>Log out</a></li>
        </ul>
      </nav>
        : false
      }
      {(statusContent == "Packs")
        ? (<button onClick={getNftUnclaimPack}>Unclaim Packs</button>)
        : (statusContent == "UnclaimPacks")
        ? (<button onClick={getNftPack}>My Packs</button>)
        : false
      }
      <div id='balance'>Hello {userAccount} {balanceAccount}</div>
      <div>
        {buttonL}
      </div>
      <div>
        {packsL}
      </div>
    </div>
  );
}

export default App;
