import React from 'react'

async function updateInputValue(koin,evt,nameContent,gambarContent,buttonContent,fee,setPacksL,tipe){
  if(koin==="FRCOIN"){
    global.config.frcoin = evt.target.value;
  }
  else if(koin==="FRGAS"){
    global.config.frgas = evt.target.value;
  }
  else if(koin==="FRENERGY"){
    global.config.frenergy = evt.target.value;
  }
  var receiveContent=[];
  receiveContent.push(<td key="col41">Receive Amount</td>);
  if(tipe+""==="refill"){
    receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(fee)) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    ? (global.config.frgas) : false}</td>);
  }
  else if(tipe+""==="refillenergy"){
    receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(fee)) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy) : false}</td>);
  }
  else{
    receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    ? (global.config.frgas*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col44">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy*(100-fee)/100) : false}</td>);
  }

  global.config.imgPacksL = [];
  if(tipe+""==="refill"){
    global.config.imgPacksL.push(<p key="wit1">convert frgas (1 : {fee})</p>);
  }
  else if(tipe+""==="refillenergy"){
    global.config.imgPacksL.push(<p key="wit1">convert frenerg (1 : {fee})</p>);
  }
  else{
    global.config.imgPacksL.push(<p key="wit1">{tipe} fee : {fee} %</p>);
  }
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
}
export default updateInputValue;