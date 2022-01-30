import initilisasi from './initilisasi.js'
import deposit from './deposit.js'
import React, { Component } from 'react'
import updateInputValue from './updateInputValue.js'

async function getDeposit(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  global.config.session = await initilisasi(timerCooking);

  var userStr = String(global.config.session.auth.actor);
  var hasil = await global.config.link.client.v1.chain.get_table_rows({
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
  global.config.frcoin = null;
  global.config.frgas = null;
  global.config.frenergy = null;

  var frcoin = "0.0000";
  var frgas = "0.0000";
  var frenergy = "0.0000";
  for(var i=0;i<hasil["rows"].length;i++){
    if(hasil["rows"][i]["balance"].split(" ")[1]=="FRCOIN"){
      frcoin=hasil["rows"][i]["balance"].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"].split(" ")[1]=="FRGAS"){
      frgas=hasil["rows"][i]["balance"].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"].split(" ")[1]=="FRENERG"){
      frenergy=hasil["rows"][i]["balance"].split(" ")[0];
    }    
  }

  var nameContent=[];
  nameContent.push(<td key="col11">Balances</td>);
  nameContent.push(<td key="col12">{frcoin} FRCOIN</td>);
  nameContent.push(<td key="col13">{frgas} FRGAS</td>);
  nameContent.push(<td key="col14">{frenergy} FRENERG</td>);

  var buttonContent=[];
  buttonContent.push(<td key="col31"></td>);
  buttonContent.push(<td key="col32"><button onClick={() => {deposit("FRCOIN",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Deposit</button></td>);
  buttonContent.push(<td key="col33"><button onClick={() => {deposit("FRGAS",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Deposit</button></td>);
  buttonContent.push(<td key="col34"><button onClick={() => {deposit("FRENERGY",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Deposit</button></td>);

  var fee = 0;

  var receiveContent=[];
  receiveContent.push(<td key="col41">Receive Amount</td>);
  receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    ? (global.config.frgas*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col44">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy*(100-fee)/100) : false}</td>);

  var gambarContent=[];
  gambarContent.push(<td key="col51">Amount</td>);
  gambarContent.push(<td key="col52"><input type="text" name="global.config.frcoin" onChange={evt => updateInputValue("FRCOIN",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);
  gambarContent.push(<td key="col53"><input type="text" name="global.config.frgas"  onChange={evt => updateInputValue("FRGAS",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);
  gambarContent.push(<td key="col54"><input type="text" name="global.config.frenergy" onChange={evt => updateInputValue("FRENERGY",evt,nameContent,gambarContent,buttonContent,fee,setPacksL)}/></td>);

  global.config.imgPacksL = [];
  global.config.imgPacksL.push(<p key="wit1">deposit fee : {fee} %</p>);
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
  setStatusContent("WalletDeposit");
  setJudul(<h2>Deposit</h2>);
}
export default getDeposit;