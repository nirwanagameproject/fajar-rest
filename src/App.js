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
  let frcoin;
  let frgas;
  let frenergy;
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

  async function buyPacks(tempId,userKu,pricePacks){
    const action = {
        account: 'fajarmuhf123',
        name: 'buypack',
        authorization: [session.auth],
        data: {
          templateId: (tempId),
          newOwner : (userKu),
          quantity: pricePacks
        }
    }
      const response = await session.transact({action})
      .then(function(response){
        if(response.processed.receipt.status=="executed"){
          onShowAlert("success","Pack successfully purchased.Transaction at "+response.processed.id,"Pack Bought",() => {getNftPack();coba(userKu);onCloseAlert()});
        }
      })
      .catch(function (e) {
        console.log(e);
        onShowAlert("error","Pack failed to buy."+e,"Fail Bought",() => {onCloseAlert()});
      })
      
  }

  async function getClaimedNft(trxId){
    
    session = await link.restoreSession(identifier);

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
      let imgClaim = <td><img src={imgku} style={{width: '120px',height:'120px'}}></img></td>;
      let rarityClaim = <td>{rarityku}</td>;
      imgPacksL = 
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
      setPacksL(imgPacksL);
    
    });
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
        const assetId = (json["data"][i]["asset_id"]);
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
    var json = await link.client.v1.chain.get_table_rows({
      code: "atomicpacksx",
      index_position: 1,
      json: true,
      key_type: "",
      limit: 1000,
      lower_bound: "",
      reverse: false,
      scope: assetId,
      show_payer: false,
      table: "unboxassets",
      upper_bound: ""
    });

    session = await link.restoreSession(identifier);
    const action = {
        account: 'atomicpacksx',
        name: 'claimunboxed',
        authorization: [session.auth],
        data: {
          origin_roll_ids: [json["rows"][0]["origin_roll_id"]],
          pack_asset_id : assetId
        }
    }
    const response = await session.transact({action})
    .then(function(response){
      if(response.processed.receipt.status=="executed"){
        onShowAlert("success","Pack successfully claimed.Transaction at "+response.processed.id,"Pack Claimed",() => {getClaimedNft(response.processed.id);onCloseAlert()});
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
        const assetIds = assetId;
        let buttonku = <button onClick={() => claimPacks(assetIds)}>Claim</button>;
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
        let rarityku = json["data"][i]["data"]["rarity"];
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
        let rarityku = json["data"][i]["data"]["rarity"];
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

  async function getPacksContent(json){
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

    let nameContent=[];
    let descContent=[];
    let priceContent=[];
    let gambarContent=[];
    let buttonContent=[];

    let idPackArr = [];
    let pricePackArr = [];

    var store = (function() {
        var map = {};

        return {
            set: function ( name, value ) {
                map[ name ] = value;
            },
            get: function ( name ) {
                return map[ name ];
            }
        };
    })();

    for(var i=0;i<json["data"].length;i++){
      var descPacks = (json["data"][i]["immutable_data"]["description"]);
      var namePacks = (json["data"][i]["name"]);
      var idPacks = (json["data"][i]["template_id"]);
      var gambarPacks = 'https://ipfs.io/ipfs/'+(json["data"][i]["immutable_data"]["img"]);

      for(var j=0;j<hasil["rows"].length;j++){
        if(idPacks == hasil["rows"][j]["template_id"]){
          let nameNow = "nameNft"+i;
          let imgNftNow = "imageNft"+i;
          let rarityNow = "rarityNft"+i;
          let priceNow = "priceNft"+i;
          let gambarNow = "gambarNft"+i;
          let buttonNow = "buttonNft"+i;

          const idPacks = hasil["rows"][j]["template_id"];
          
          const pricePacks = hasil["rows"][j]["price"];
          const fungsi = () => {buyPacks(idPacks,(session.auth.actor),pricePacks)};
          nameContent.push(<td key={nameNow}>{namePacks}</td>);
          descContent.push(<td key={imgNftNow}>{descPacks}</td>);
          priceContent.push(<td key={priceNow}>{pricePacks}</td>);
          gambarContent.push(<td key={gambarNow}><img src={gambarPacks} style={{width: '120px',height:'120px'}}></img></td>);
          buttonContent.push(<td key={buttonNow}><button onClick={fungsi}>Buy Now</button></td>);
        }
      }
    }


    imgPacksL = 
                <table align="center" style={{marginTop: '20px'}} >
                  <thead>
                    <tr>
                      {nameContent}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {gambarContent}
                    </tr>
                    <tr>
                      {descContent}
                    </tr>
                    <tr>
                      {priceContent}
                    </tr>
                    <tr>
                      {buttonContent}
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

        let pricePacks = getPacksContent(json);


        setStatusContent("BuyPacks");
    })
  }

  async function getCooking(){

  }

  async function updateInputValue(koin,evt,nameContent,gambarContent,buttonContent,fee){
    if(koin=="frcoin"){
      frcoin = evt.target.value;
    }
    else if(koin=="frgas"){
      frgas = evt.target.value;
    }
    else if(koin=="frenergy"){
      frenergy = evt.target.value;
    }
    var receiveContent=[];
    receiveContent.push(<td key="col41">Receive Amount</td>);
    receiveContent.push(<td key="col42">{(!isNaN(frcoin) && !isNaN(parseFloat(frcoin)))
      ? (frcoin*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col43">{(!isNaN(frgas) && !isNaN(parseFloat(frgas)))
      ? (frgas*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col44">{(!isNaN(frenergy) && !isNaN(parseFloat(frenergy)))
      ? (frenergy*(100-fee)/100) : false}</td>);

    imgPacksL = [];
    imgPacksL.push(<p key="wit1">withdraw fee : {fee} %</p>);
    imgPacksL.push(<table key="wit2" align="center" style={{marginTop: '20px'}} >
                  <thead>
                    <tr>
                      {nameContent}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {gambarContent}
                    </tr>
                    <tr>
                      {receiveContent}
                    </tr>
                    <tr>
                      {buttonContent}
                    </tr>
                  </tbody>
                </table>);
    setPacksL(imgPacksL);
  }

  async function deposit(koin){
    if(koin=="frcoin"){
      if (!isNaN(frcoin) && !isNaN(parseFloat(frcoin)))
      { 
        const action = {
          account: 'fajarmftoken',
          name: 'transfer',
          authorization: [session.auth],
          data: {
            from: String(session.auth.actor),
            to : ("fajarmuhf123"),
            quantity: parseFloat(frcoin).toFixed(4)+" FRCOIN",
            memo: "deposit"
          }
        }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })
      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
    else if(koin=="frgas"){
      if (!isNaN(frgas) && !isNaN(parseFloat(frgas)))
      { 
        const action = {
          account: 'fajarmftoken',
          name: 'transfer',
          authorization: [session.auth],
          data: {
            from: String(session.auth.actor),
            to : ("fajarmuhf123"),
            quantity: parseFloat(frgas).toFixed(4)+" FRGAS",
            memo: "deposit"
          }
      }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })

      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
    else if(koin=="frenergy"){
      if (!isNaN(frenergy) && !isNaN(parseFloat(frenergy)))
      { 
        const action = {
          account: 'fajarmftoken',
          name: 'transfer',
          authorization: [session.auth],
          data: {
            from: String(session.auth.actor),
            to : ("fajarmuhf123"),
            quantity: parseFloat(frenergy).toFixed(4)+" FRENERG",
            memo: "deposit"
          }
        }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })


      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
  }

  async function withdraw(koin){
    if(koin=="frcoin"){
      if (!isNaN(frcoin) && !isNaN(parseFloat(frcoin)))
      { 
        const action = {
          account: 'fajarmuhf123',
          name: 'withdraw',
          authorization: [session.auth],
          data: {
            from: ("fajarmuhf123"),
            to : String(session.auth.actor),
            quantity: parseFloat(frcoin).toFixed(4)+" FRCOIN",
            memo: "withdraw"
          }
        }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })
      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
    else if(koin=="frgas"){
      if (!isNaN(frgas) && !isNaN(parseFloat(frgas)))
      { 
        const action = {
          account: 'fajarmuhf123',
          name: 'withdraw',
          authorization: [session.auth],
          data: {
            from: ("fajarmuhf123"),
            to : String(session.auth.actor),
            quantity: parseFloat(frgas).toFixed(4)+" FRGAS",
            memo: "withdraw"
          }
        }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })

      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
    else if(koin=="frenergy"){
      if (!isNaN(frenergy) && !isNaN(parseFloat(frenergy)))
      { 
        const action = {
          account: 'fajarmuhf123',
          name: 'withdraw',
          authorization: [session.auth],
          data: {
            from: ("fajarmuhf123"),
            to : String(session.auth.actor),
            quantity: parseFloat(frenergy).toFixed(4)+" FRENERG",
            memo: "withdraw"
          }
        }
        const response = await session.transact({action})
        .then(function(response){
          if(response.processed.receipt.status=="executed"){
            onShowAlert("success","Deposit successfully.Transaction at "+response.processed.id,"Deposit success",() => {coba(String(session.auth.actor));onCloseAlert()});
          }
        })
        .catch(function (e) {
          console.log(e);
          onShowAlert("error","Deposit failed."+e,"Fail Deposit",() => {onCloseAlert()});
        })


      }
      else{
        onShowAlert("error","Wrong Input Number.","Wrong Number",() => {onCloseAlert()});
      }
    }
  }

  async function getWithdraw(){
    session = await link.restoreSession(identifier);
    var userStr = String(session.auth.actor);
    var hasil = await link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "account",
        limit: "100",
        lower_bound: userStr,
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "account",
        upper_bound: userStr
      });
    let Frcoin = "0.0000";
    let Frgas = "0.0000";
    let Frenergy = "0.0000";
    for(var i=0;i<hasil["rows"].length;i++){
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRCOIN"){
        Frcoin=hasil["rows"][i]["balance"][0].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRGAS"){
        Frgas=hasil["rows"][i]["balance"][0].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRGAS"){
        Frenergy=hasil["rows"][i]["balance"][0].split(" ")[0];
      }    
    }

    var nameContent=[];
    nameContent.push(<td key="col11">Balances</td>);
    nameContent.push(<td key="col12">{Frcoin} FRCOIN</td>);
    nameContent.push(<td key="col13">{Frgas} FRGAS</td>);
    nameContent.push(<td key="col14">{Frenergy} FRENERG</td>);

    var buttonContent=[];
    buttonContent.push(<td key="col31"></td>);
    buttonContent.push(<td key="col32"><button onClick={() => {withdraw("frcoin");}}>Withdraw</button></td>);
    buttonContent.push(<td key="col33"><button onClick={() => {withdraw("frgas");}}>Withdraw</button></td>);
    buttonContent.push(<td key="col34"><button onClick={() => {withdraw("frenergy");}}>Withdraw</button></td>);

    var hasil2 = await link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "id",
        limit: "100",
        lower_bound: 1,
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "confaccount",
        upper_bound: 1
      });
    var fee = hasil2["rows"][0]["fee"];

    var receiveContent=[];
    receiveContent.push(<td key="col41">Receive Amount</td>);
    receiveContent.push(<td key="col42">{(!isNaN(frcoin) && !isNaN(parseFloat(frcoin)))
      ? (frcoin*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col43">{(!isNaN(frgas) && !isNaN(parseFloat(frgas)))
      ? (frgas*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col44">{(!isNaN(frenergy) && !isNaN(parseFloat(frenergy)))
      ? (frenergy*(100-fee)/100) : false}</td>);


    var gambarContent=[];
    gambarContent.push(<td key="col21">Amount</td>);
    gambarContent.push(<td key="col22"><input type="text" name="frcoin" onChange={evt => updateInputValue("frcoin",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);
    gambarContent.push(<td key="col23"><input type="text" name="frgas"  onChange={evt => updateInputValue("frgas",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);
    gambarContent.push(<td key="col24"><input type="text" name="frenergy" onChange={evt => updateInputValue("frenergy",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);

    imgPacksL = [];
    imgPacksL.push(<p key="wit1">withdraw fee : {fee} %</p>);
    imgPacksL.push(<table key="wit2" align="center" style={{marginTop: '20px'}} >
                  <thead>
                    <tr>
                      {nameContent}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {gambarContent}
                    </tr>
                    <tr>
                      {receiveContent}
                    </tr>
                    <tr>
                      {buttonContent}
                    </tr>
                  </tbody>
                </table>);
    setPacksL(imgPacksL);
    setStatusContent("WalletWithdraw");
  }

  async function getDeposit(){
    session = await link.restoreSession(identifier);
    var userStr = String(session.auth.actor);
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
    let Frcoin = "0.0000";
    let Frgas = "0.0000";
    let Frenergy = "0.0000";
    for(var i=0;i<hasil["rows"].length;i++){
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRCOIN"){
        Frcoin=hasil["rows"][i]["balance"].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRGAS"){
        Frgas=hasil["rows"][i]["balance"].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"].split(" ")[1]=="FRGAS"){
        Frenergy=hasil["rows"][i]["balance"].split(" ")[0];
      }    
    }

    var nameContent=[];
    nameContent.push(<td key="col11">Balances</td>);
    nameContent.push(<td key="col12">{Frcoin} FRCOIN</td>);
    nameContent.push(<td key="col13">{Frgas} FRGAS</td>);
    nameContent.push(<td key="col14">{Frenergy} FRENERG</td>);

    var buttonContent=[];
    buttonContent.push(<td key="col31"></td>);
    buttonContent.push(<td key="col32"><button onClick={() => {deposit("frcoin");}}>Deposit</button></td>);
    buttonContent.push(<td key="col33"><button onClick={() => {deposit("frgas");}}>Deposit</button></td>);
    buttonContent.push(<td key="col34"><button onClick={() => {deposit("frenergy");}}>Deposit</button></td>);

    var fee = 0;

    var receiveContent=[];
    receiveContent.push(<td key="col41">Receive Amount</td>);
    receiveContent.push(<td key="col42">{(!isNaN(frcoin) && !isNaN(parseFloat(frcoin)))
      ? (frcoin*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col43">{(!isNaN(frgas) && !isNaN(parseFloat(frgas)))
      ? (frgas*(100-fee)/100) : false}</td>);
    receiveContent.push(<td key="col44">{(!isNaN(frenergy) && !isNaN(parseFloat(frenergy)))
      ? (frenergy*(100-fee)/100) : false}</td>);

    var gambarContent=[];
    gambarContent.push(<td key="col51">Amount</td>);
    gambarContent.push(<td key="col52"><input type="text" name="frcoin" onChange={evt => updateInputValue("frcoin",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);
    gambarContent.push(<td key="col53"><input type="text" name="frgas"  onChange={evt => updateInputValue("frgas",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);
    gambarContent.push(<td key="col54"><input type="text" name="frenergy" onChange={evt => updateInputValue("frenergy",evt,nameContent,gambarContent,buttonContent,fee)}/></td>);

    imgPacksL = [];
    imgPacksL.push(<p key="wit1">deposit fee : {fee} %</p>);
    imgPacksL.push(<table key="wit2" align="center" style={{marginTop: '20px'}} >
                  <thead>
                    <tr>
                      {nameContent}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {gambarContent}
                    </tr>
                    <tr>
                      {receiveContent}
                    </tr>
                    <tr>
                      {buttonContent}
                    </tr>
                  </tbody>
                </table>);
    setPacksL(imgPacksL);
    setStatusContent("WalletDeposit");
  }

  async function getWallet(){
    getDeposit();
  }

  async function coba(userStr){
    var hasil = await link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "account",
        limit: "100",
        lower_bound: userStr,
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "account",
        upper_bound: userStr
      });
    let frcoin = "0.0000";
    let frgas = "0.0000";
    let frenergy = "0.0000";
    for(var i=0;i<hasil["rows"].length;i++){
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRCOIN"){
        frcoin=hasil["rows"][i]["balance"][0].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRGAS"){
        frgas=hasil["rows"][i]["balance"][0].split(" ")[0];
      }
      if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRGAS"){
        frenergy=hasil["rows"][i]["balance"][0].split(" ")[0];
      }    
    }
    let bal = ", FRCOIN = "+frcoin+", FRGAS = "+frgas+", FRENERGY = "+frenergy;
    setBalanceAccount(bal);
      
  }

  async function newUser(sesi){
    let userKu = sesi.auth.actor;
    var hasil = await link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "account",
        limit: "100",
        lower_bound: userKu,
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "account",
        upper_bound: userKu
      });

    if(hasil["rows"].length == 0){
      const action = {
          account: 'fajarmuhf123',
          name: 'newuser',
          authorization: [sesi.auth],
          data: {
            nama: (userKu)
          }
      }
      const response = await sesi.transact({action})
      .then(function(response){
          console.log("halo");
          session = sesi;
          restoreSession();
      }).catch(function (e) {
          sesi.remove();
      });
    }
    else{        
      session = sesi;
      restoreSession();
    }
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
      setStatusContent('');
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
          newUser(result.session);
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
          <li><a onClick={getCooking}>Cooking</a></li>
          <li><a onClick={getWallet}>Wallet</a></li>
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
      {(statusContent == "WalletDeposit")
        ? (<button onClick={getWithdraw}>Withdraw</button>)
        : (statusContent == "WalletWithdraw")
        ? (<button onClick={getDeposit}>Deposit</button>)
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
