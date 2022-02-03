import initilisasi from './initilisasi.js'
import refill from './refill.js'
import convert from './convert.js'
import React from 'react'
import updateInputValue from './updateInputValue.js'

async function getRefillEnergy(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
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
  var hasil2 = await global.config.link.client.v1.chain.get_table_rows({
      code: "fajarmuhf123",
      index_position: 1,
      json: true,
      key_type: "int",
      limit: "100",
      lower_bound: 1,
      reverse: false,
      scope: "fajarmuhf123",
      show_payer: false,
      table: "confaccount",
      upper_bound: 1
    });
  global.config.frcoin = null;
  global.config.frenergy = null;

  var frcoin = "0.0000";
  var frenergy = "0.0000";
  for(var i=0;i<hasil["rows"].length;i++){
    if(hasil["rows"][i]["balance"][0].split(" ")[1]==="FRCOIN"){
      frcoin=hasil["rows"][i]["balance"][0].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"][2].split(" ")[1]==="FRENERG"){
      frenergy=hasil["rows"][i]["balance"][2].split(" ")[0];
    } 
  }

  var nameContent=[];
  nameContent.push(<td key="col11">Balances</td>);
  nameContent.push(<td key="col12">{frcoin} FRCOIN</td>);
  nameContent.push(<td key="col13">{frenergy} FRENERG</td>);

  var buttonContent=[];
  buttonContent.push(<td key="col31"></td>);
  buttonContent.push(<td key="col32"><button onClick={() => {convert("FRENERGY",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Convert to FRENERG</button></td>);
  buttonContent.push(<td key="col33"><button onClick={() => {refill("FRENERGY",setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);}}>Refill Energy</button></td>);
  
  var fee = hasil2["rows"][0]["frcoin_to_frenergy"]/10000;

  var receiveContent=[];
  receiveContent.push(<td key="col41">Receive Amount</td>);
  receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy*(100-fee)/100) : false}</td>);
  
  var gambarContent=[];
  gambarContent.push(<td key="col61">Amount</td>);
  gambarContent.push(<td key="col62"><input type="text" name="frcoin" onChange={evt => updateInputValue("FRCOIN",evt,nameContent,gambarContent,buttonContent,fee,setPacksL,"refillenergy")}/></td>);
  gambarContent.push(<td key="col63"><input type="text" name="frenergy"  onChange={evt => updateInputValue("FRENERGY",evt,nameContent,gambarContent,buttonContent,fee,setPacksL,"refillenergy")}/></td>);
  
  global.config.imgPacksL = [];
  global.config.imgPacksL.push(<p key="wit1">convert frenerg (1 : {fee})</p>);
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
  setStatusContent("RefillEnergy");
  setJudul(<h2>Refill Energy</h2>);
}
export default getRefillEnergy;