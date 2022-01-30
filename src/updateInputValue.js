import React from 'react'

async function updateInputValue(koin,evt,nameContent,gambarContent,buttonContent,fee,setPacksL){
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
  receiveContent.push(<td key="col42">{(!isNaN(global.config.frcoin) && !isNaN(parseFloat(global.config.frcoin)))
    ? (global.config.frcoin*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col43">{(!isNaN(global.config.frgas) && !isNaN(parseFloat(global.config.frgas)))
    ? (global.config.frgas*(100-fee)/100) : false}</td>);
  receiveContent.push(<td key="col44">{(!isNaN(global.config.frenergy) && !isNaN(parseFloat(global.config.frenergy)))
    ? (global.config.frenergy*(100-fee)/100) : false}</td>);

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
}
export default updateInputValue;