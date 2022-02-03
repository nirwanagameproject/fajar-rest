import initilisasi from './initilisasi.js'
import React from 'react'
import getAddServe from './getAddServe.js'
import inviteCust from './inviteCust.js'
import claimCust from './claimCust.js'
import slot from './img/slot.png'


async function getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.statusTimerCooking=true;

  global.config.foodSlot = [];
  global.config.toolsSlot = [];

  var hasil = await global.config.link.client.v1.chain.get_table_rows({
    code: "fajarmuhf123",
    index_position: 1,
    json: true,
    key_type: "account",
    limit: "100",
    lower_bound: String(global.config.session.auth.actor),
    reverse: false,
    scope: "fajarmuhf123",
    show_payer: false,
    table: "account",
    upper_bound: String(global.config.session.auth.actor)
  });
  var hasil2 = await global.config.link.client.v1.chain.get_table_rows({
    code: "fajarmuhf123",
    index_position: 2,
    json: true,
    key_type: "name",
    limit: "100",
    lower_bound: String(global.config.session.auth.actor),
    reverse: false,
    scope: "fajarmuhf123",
    show_payer: false,
    table: "restaurant",
    upper_bound: String(global.config.session.auth.actor)
  });

  var kNama = [];
  var kButton = [];
  var kTimer = [];
  var kReqButton;
  for(var i=0;i<hasil["rows"][0]["slot_customer"];i++){
    var keku = "kNama"+i;
    var CuisineFood = "";
    kNama.push(<td key={keku}><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'140px'}}>{CuisineFood}</div></td>);  

    keku = "kButton"+i;
    kButton.push(<td key={keku}></td>);
  
    keku = "kTimer"+i;
    kTimer.push(<td key={keku}></td>);

    keku = "kReqButton"+i;
    var colReqButton = hasil["rows"][0]["slot_customer"];
    kReqButton = (<td colSpan={colReqButton} key={keku}>loading..</td>);
  }

  for(i=0;i<hasil["rows"][0]["slot_customer"];i++){
    for(var j=0;j<hasil2["rows"].length;j++){
      if(hasil2["rows"][j]["slot_id"]+""===(i+1)+""){
        const customer_id = (hasil2["rows"][j]["customer_id"]);

        var hasilku = await global.config.link.client.v1.chain.get_table_rows({
          code: "fajarmuhf123",
          index_position: 1,
          json: true,
          key_type: "int",
          limit: "100",
          lower_bound: customer_id,
          reverse: false,
          scope: "fajarmuhf123",
          show_payer: false,
          table: "customer",
          upper_bound: customer_id
        });

        const keku = "kNama"+i;
        const kekuNama = "cuisineNama"+i;
        const gambarNama = "cuisineGambar"+i;
        const namaCuisine = (hasilku["rows"][0]["name_customer"]);
        const gambarCuisine = 'https://ipfs.io/ipfs/'+(hasilku["rows"][0]["img"]);

        const CuisineFood = <ul style={{listStyleType: 'none',padding: 0,margin: 0}}>
          <li key={kekuNama} style={{color:'white'}}>{namaCuisine}</li>
          <li key={gambarNama}><img src={gambarCuisine} style={{width: '120px',height:'120px'}} alt={gambarNama}/></li>
        </ul>;

        kNama[i] = (<td key={keku}><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'140px'}}>{CuisineFood}</div></td>);
        const keku2 = "kButton"+i;
        kButton[i] = (<td key={keku2}>loading..</td>);

        const keku3 = "kTimer"+i;
        kTimer[i] = (<td key={keku3}> </td>);

        const keku4 = "kReqButton"+i;
        colReqButton = hasil["rows"][0]["slot_customer"];
        kReqButton = (<td colSpan={colReqButton} key={keku4}></td>);
      }
    }
  }
 
  global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                  <thead>
                    <tr key="nameNft">
                      {kNama}
                    </tr>
                  </thead>
                  <tbody>
                    <tr key="timerNft">
                      {kTimer}
                    </tr>  
                    <tr key="slotNft">
                      {kButton}
                    </tr>  
                    <tr key="reqButtonNft">
                      {kReqButton}
                    </tr>  
                  </tbody>
                  </table>;
  setPacksL(global.config.imgPacksL);
  setStatusContent("Customer");
  setJudul(<h2>My Restaurant</h2>);
  global.config.timersku = setInterval(async () => {
    if(global.config.statusTimerCooking){
      var hasil = await global.config.link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "account",
        limit: "100",
        lower_bound: String(global.config.session.auth.actor),
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "account",
        upper_bound: String(global.config.session.auth.actor)
      });
      var hasil2 = await global.config.link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 2,
        json: true,
        key_type: "name",
        limit: "100",
        lower_bound: String(global.config.session.auth.actor),
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "restaurant",
        upper_bound: String(global.config.session.auth.actor)
      });

      var hasil3 = await global.config.link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 2,
        json: true,
        key_type: "name",
        limit: "100",
        lower_bound: String(global.config.session.auth.actor),
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "customerreq",
        upper_bound: String(global.config.session.auth.actor)
      });

      for(var i=0;i<hasil["rows"][0]["slot_customer"];i++){
        var found = false;
        for(var j=0;j<hasil2["rows"].length;j++){
          if(hasil2["rows"][j]["slot_id"]+""===(i+1)+""){
            found = true;
            const customer_id = (hasil2["rows"][j]["customer_id"]);

            var hasilku = await global.config.link.client.v1.chain.get_table_rows({
              code: "fajarmuhf123",
              index_position: 1,
              json: true,
              key_type: "int",
              limit: "100",
              lower_bound: customer_id,
              reverse: false,
              scope: "fajarmuhf123",
              show_payer: false,
              table: "customer",
              upper_bound: customer_id
            });

            if(global.config.statusTimerCooking){
              
              const keku = "kNama"+i;
              const kekuNama = "cuisineNama"+i;
              const gambarNama = "cuisineGambar"+i;
              const namaCuisine = (hasilku["rows"][0]["name_customer"]);
              const gambarCuisine = 'https://ipfs.io/ipfs/'+(hasilku["rows"][0]["img"]);

              const CuisineFood = <ul style={{listStyleType: 'none',padding: 0,margin: 0}}>
                <li key={kekuNama} style={{color:'white'}}>{namaCuisine}</li>
                <li key={gambarNama}><img src={gambarCuisine} style={{width: '120px',height:'120px'}} alt={gambarNama}/></li>
              </ul>;

              kNama[i] = (<td key={keku}><div style={{margin:'auto',paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '140px',height:'140px'}}>{CuisineFood}</div></td>);

              const status = (hasil2["rows"][j]["status"]);
              const nextAvailability = (hasil2["rows"][j]["next_availability"]);
              const nextAvailabilityInvite = (hasil3["rows"][0]["next_availability"]);
              const profit = (hasil2["rows"][j]["reward"]);
              const timeCount = nextAvailability-Math.round(new Date().getTime()/1000);
              const timeCountReqInvite = nextAvailabilityInvite-Math.round(new Date().getTime()/1000);


              const keku4 = "kReqButton"+i;
              colReqButton = hasil["rows"][0]["slot_customer"];
              kReqButton = (<td colSpan={colReqButton} key={keku4}><button onClick={() =>{inviteCust(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Invite Customer</button></td>);
  
              if(timeCount <= 0){
                if(timeCountReqInvite <= 0){
                  tampilkan("ready",i,kTimer,status,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kReqButton,"ready",colReqButton,profit);
                }
                else{
                  var days = Math.floor(timeCountReqInvite / (60 * 60 * 24));
                  var hours = Math.floor((timeCountReqInvite % (60 * 60 * 24)) / (60 * 60));
                  hours = ("0" + hours).slice(-2);
                  var minutes = Math.floor((timeCountReqInvite % (60 * 60)) / (60));
                  minutes = ("0" + minutes).slice(-2);
                  var seconds = Math.floor((timeCountReqInvite % (60)) );
                  seconds = ("0" + seconds).slice(-2);
                  var timeString2 = days+" "+hours+":"+minutes+":"+seconds;

                  tampilkan("ready",i,kTimer,status,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kReqButton,timeString2,colReqButton,profit);  
                }
              }
              else{
                if(timeCountReqInvite <= 0){
                  days = Math.floor(timeCount / (60 * 60 * 24));
                  hours = Math.floor((timeCount % (60 * 60 * 24)) / (60 * 60));
                  hours = ("0" + hours).slice(-2);
                  minutes = Math.floor((timeCount % (60 * 60)) / (60));
                  minutes = ("0" + minutes).slice(-2);
                  seconds = Math.floor((timeCount % (60)) );
                  seconds = ("0" + seconds).slice(-2);
                  var timeString = days+" "+hours+":"+minutes+":"+seconds;
                  tampilkan(timeString,i,kTimer,status,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kReqButton,"ready",colReqButton,profit);
                }
                else{
                  days = Math.floor(timeCount / (60 * 60 * 24));
                  hours = Math.floor((timeCount % (60 * 60 * 24)) / (60 * 60));
                  hours = ("0" + hours).slice(-2);
                  minutes = Math.floor((timeCount % (60 * 60)) / (60));
                  minutes = ("0" + minutes).slice(-2);
                  seconds = Math.floor((timeCount % (60)) );
                  seconds = ("0" + seconds).slice(-2);
                  timeString = days+" "+hours+":"+minutes+":"+seconds;

                  days = Math.floor(timeCountReqInvite / (60 * 60 * 24));
                  hours = Math.floor((timeCountReqInvite % (60 * 60 * 24)) / (60 * 60));
                  hours = ("0" + hours).slice(-2);
                  minutes = Math.floor((timeCountReqInvite % (60 * 60)) / (60));
                  minutes = ("0" + minutes).slice(-2);
                  seconds = Math.floor((timeCountReqInvite % (60)) );
                  seconds = ("0" + seconds).slice(-2);
                  timeString2 = days+" "+hours+":"+minutes+":"+seconds;

                  tampilkan(timeString,i,kTimer,status,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kReqButton,timeString2,colReqButton,profit);  
                }
              }
            }

          }
        }
        if(!found){
          const keku2 = "kButton"+i;
          kButton[i] = (<td key={keku2}></td>);

          const keku4 = "kReqButton"+i;
          colReqButton = hasil["rows"][0]["slot_customer"];
          kReqButton = (<td colSpan={colReqButton} key={keku4}><button onClick={() =>{inviteCust(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Invite Customer</button></td>);
  
          if(global.config.statusTimerCooking){
            global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                          <thead>
                            <tr key="nameNft">
                              {kNama}
                            </tr>
                          </thead>
                          <tbody>
                            <tr key="timerNft">
                              {kTimer}
                            </tr>  
                            <tr key="slotNft">
                              {kButton}
                            </tr>  
                            <tr key="reqButtonNft">
                              {kReqButton}
                            </tr>  
                          </tbody>
                          </table>;
            setPacksL(global.config.imgPacksL);
          }
        }
      }
    }
    else{
      clearInterval(global.config.timersku);
    }

  },1000);
 
}

function tampilkan(timeleft,i,kTimer,status,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kReqButton,timeString2,colReqButton,profit) {
  const timeString = timeleft;
  const keku3 = "kTimer"+i;
  kTimer[i] = (<td key={keku3}>({timeString})</td>);
  const keku2 = "kButton"+i;
  const id_slot = i+1;
  if(status+""==="waiting"){
    kButton[i] = (<td key={keku2} onClick={() => {getAddServe(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}><button>Serve</button></td>);
  }
  else {
    if(timeleft+""==="ready" && status+"" === "served"){
      kButton[i] = (<td key={keku2} onClick={() => {claimCust(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}><button>Collect</button></td>);
    }
    if(!(timeleft+""==="ready") && status+"" === "served"){
      kButton[i] = (<td key={keku2}> eating.. </td>);  
    }
    if(status+"" === "claimed"){
      kButton[i] = (<td key={keku2}> rewarded {(profit/10000)} FRCOIN</td>);  
    }
  }  

  const keku4 = "kReqButton"+i;
  if(timeString2+"" === "ready"){
    kReqButton = (<td colSpan={colReqButton} key={keku4}><button onClick={() =>{inviteCust(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);}}>Invite Customer</button></td>);
  }
  else{
    kReqButton = (<td colSpan={colReqButton} key={keku4}>({timeString2})</td>);  
  }

  if(global.config.statusTimerCooking){
    global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
                    <thead>
                      <tr key="nameNft">
                        {kNama}
                      </tr>
                    </thead>
                    <tbody>
                      <tr key="timerNft">
                        {kTimer}
                      </tr>  
                      <tr key="slotNft">
                        {kButton}
                      </tr>  
                      <tr key="reqButtonNft">
                        {kReqButton}
                      </tr>  
                    </tbody>
                    </table>;
    setPacksL(global.config.imgPacksL);
  }
}


export default getCustomer;