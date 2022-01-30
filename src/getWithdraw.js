import initilisasi from './initilisasi.js'
import withdraw from './withdraw.js'
import React from 'react'
import updateInputValue from './updateInputValue.js'

async function getWithdraw(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  global.config.session = await initilisasi(timerCooking);

  var userStr = String(global.config.session.auth.actor);
  var hasil = await global.config.link.client.v1.chain.get_table_rows({
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
  global.config.frcoin = null;
  global.config.frgas = null;
  global.config.frenergy = null;

  var frcoin2 = "0.0000";
  var frgas2 = "0.0000";
  var frenergy2 = "0.0000";
  for(var i=0;i<hasil["rows"].length;i++){
    if(hasil["rows"][i]["balance"][0].split(" ")[1]==="FRCOIN"){
      frcoin2=hasil["rows"][i]["balance"][0].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"][0].split(" ")[1]==="FRGAS"){
      frgas2=hasil["rows"][i]["balance"][0].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"][0].split(" ")[1]==="FRENERG"){
      frenergy2=hasil["rows"][i]["balance"][0].split(" ")[0];
    }    
  }

  var nameContent=[];
  nameContent.push(<td key="col11">Balances</td>);
  nameContent.push(<td key="col12">{frcoin2} FRCOIN</td>);
  nameContent.push(<td key="col13">{frgas2} FRGAS</td>);
  nameContent.push(<td key="col14">{frenergy2} FRENERG</td>);

  var buttonContent=[];
  buttonContent.push(<td key="col31"></td>);
  buttonContent.push(<td key="col32"><button onClick={() => {withdraw("FRCOIN",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Withdraw</button></td>);
  buttonContent.push(<td key="col33"><button onClick={() => {withdraw("FRGAS",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Withdraw</button></td>);
  buttonContent.push(<td key="col34"><button onClick={() => {withdraw("FRENERG",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Withdraw</button></td>);

  var hasil2 = await global.config.link.client.v1.chain.get_table_rows({
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
  receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    ? (global.config.frgas*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col44">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy*(100-fee)/100) : false}</td>);


  var gambarContent=[];
  gambarContent.push(<td key="col21">Amount</td>);
  gambarContent.push(<td key="col22"><input type="text" name="global.config.frcoin" onChange={evt => updateInputValue("FRCOIN",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);
  gambarContent.push(<td key="col23"><input type="text" name="global.config.frgas"  onChange={evt => updateInputValue("FRGAS",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);
  gambarContent.push(<td key="col24"><input type="text" name="global.config.frenergy" onChange={evt => updateInputValue("FRENERGY",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);

  global.config.imgPacksL = [];
  global.config.imgPacksL.push(<p key="wit1">withdraw fee : {fee} %</p>);
  global.config.imgPacksL.push(<table key="wit2" align="center" style={{marginTop: '20px'}} >
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
  setPacksL(global.config.imgPacksL);
  setStatusContent("WalletWithdraw");
  setJudul(<h2>Withdraw</h2>);
}
export default getWithdraw;