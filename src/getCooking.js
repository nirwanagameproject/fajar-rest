import initilisasi from './initilisasi.js'
import React from 'react'
import getCookingSlot from './getCookingSlot.js'
import claimCook from './claimCook.js'
import slot from './img/slot.png'


async function getCooking(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
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
    table: "cooking",
    upper_bound: String(global.config.session.auth.actor)
  });



  var kNama = [];
  var kButton = [];
  var kTimer = [];
  for(var i=0;i<hasil["rows"][0]["slot_cooking"];i++){
    var keku = "kNama"+i;
    var CuisineFood = "";
    kNama.push(<td key={keku}><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'140px'}}>{CuisineFood}</div></td>);  

    keku = "kButton"+i;
    kButton.push(<td key={keku}>loading..</td>);
  
    keku = "kTimer"+i;
    kTimer.push(<td key={keku}></td>);
  }

  for(i=0;i<hasil["rows"][0]["slot_cooking"];i++){
    for(var j=0;j<hasil2["rows"].length;j++){
      if(hasil2["rows"][j]["slot_id"]+""===(i+1)+""){
        const cuisine_id = (hasil2["rows"][j]["cuisine_id"]);

        var hasilku = await global.config.link.client.v1.chain.get_table_rows({
          code: "fajarmuhf123",
          index_position: 1,
          json: true,
          key_type: "int",
          limit: "100",
          lower_bound: cuisine_id,
          reverse: false,
          scope: "fajarmuhf123",
          show_payer: false,
          table: "cuisine",
          upper_bound: cuisine_id
        });

        const template_id = hasilku["rows"][0]["template_id"];

        const request = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=cuisine&limit=1000&lower_bound="+template_id+"&upper_bound="+(template_id+1));
        const json = await request.json();

        const keku = "kNama"+i;
        const kekuNama = "cuisineNama"+i;
        const gambarNama = "cuisineGambar"+i;
        const namaCuisine = (json["data"][0]["name"]);
        const gambarCuisine = 'https://ipfs.io/ipfs/'+(json["data"][0]["immutable_data"]["img"]);

        const CuisineFood = <ul style={{listStyleType: 'none',padding: 0,margin: 0}}>
          <li key={kekuNama} style={{color:'white'}}>{namaCuisine}</li>
          <li key={gambarNama}><img src={gambarCuisine} style={{width: '120px',height:'120px'}} alt={gambarNama}/></li>
        </ul>;

        kNama[i] = (<td key={keku}><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'140px'}}>{CuisineFood}</div></td>);
        const keku2 = "kButton"+i;
        kButton[i] = (<td key={keku2}>loading..</td>);

        const keku3 = "kTimer"+i;
        kTimer[i] = (<td key={keku3}> </td>);
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
                  </tbody>
                  </table>;
  setPacksL(global.config.imgPacksL);
  setStatusContent("Cooking");
  setJudul(<h2>Cooking</h2>);
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
      table: "cooking",
      upper_bound: String(global.config.session.auth.actor)
    });

      for(var i=0;i<hasil["rows"][0]["slot_cooking"];i++){
        var found = false;
        for(var j=0;j<hasil2["rows"].length;j++){
          if(hasil2["rows"][j]["slot_id"]+""===(i+1)+""){
            found = true;
            const cuisine_id = (hasil2["rows"][j]["cuisine_id"]);

            var hasilku = await global.config.link.client.v1.chain.get_table_rows({
              code: "fajarmuhf123",
              index_position: 1,
              json: true,
              key_type: "int",
              limit: "100",
              lower_bound: cuisine_id,
              reverse: false,
              scope: "fajarmuhf123",
              show_payer: false,
              table: "cuisine",
              upper_bound: cuisine_id
            });

            if(global.config.statusTimerCooking){
              const template_id = hasilku["rows"][0]["template_id"];

              const request = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=cuisine&limit=1000&lower_bound="+template_id+"&upper_bound="+(template_id+1));
              const json = await request.json();

              const keku = "kNama"+i;
              const kekuNama = "cuisineNama"+i;
              const gambarNama = "cuisineGambar"+i;
              const namaCuisine = (json["data"][0]["name"]);
              const gambarCuisine = 'https://ipfs.io/ipfs/'+(json["data"][0]["immutable_data"]["img"]);

              const CuisineFood = <ul style={{listStyleType: 'none',padding: 0,margin: 0}}>
                <li key={kekuNama} style={{color:'white'}}>{namaCuisine}</li>
                <li key={gambarNama}><img src={gambarCuisine} style={{width: '120px',height:'120px'}} alt={gambarNama}/></li>
              </ul>;

              kNama[i] = (<td key={keku}><div style={{paddingTop: '3px',backgroundImage: `url(${slot})`,backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width: '120px',height:'140px'}}>{CuisineFood}</div></td>);

              const cookingClaim = (hasil2["rows"][j]["cooking_claim"]);
              const maxCooking = (hasilku["rows"][0]["max_cooking"]);
              const nextAvailability = (hasil2["rows"][j]["next_availability"]);
              const timeCount = nextAvailability-Math.round(new Date().getTime()/1000);
              
              if(timeCount <= 0){
                tampilkan("ready",i,kTimer,cookingClaim,maxCooking,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
              }
              else{
                var days = Math.floor(timeCount / (60 * 60 * 24));
                var hours = Math.floor((timeCount % (60 * 60 * 24)) / (60 * 60));
                hours = ("0" + hours).slice(-2);
                var minutes = Math.floor((timeCount % (60 * 60)) / (60));
                minutes = ("0" + minutes).slice(-2);
                var seconds = Math.floor((timeCount % (60)) );
                seconds = ("0" + seconds).slice(-2);
                var timeString = days+" "+hours+":"+minutes+":"+seconds;
                tampilkan(timeString,i,kTimer,cookingClaim,maxCooking,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking);
              }
            }

          }
        }
        if(!found){
          const keku2 = "kButton"+i;
          const id_slot = i+1;
          kButton[i] = (<td key={keku2} onClick={() => {global.config.statusTimerCooking=false;clearInterval(global.config.timersku);getCookingSlot(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}><button>Add</button></td>);

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

function tampilkan(timeleft,i,kTimer,cookingClaim,maxCooking,kButton,kNama,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking) {
  const timeString = timeleft;
  const keku3 = "kTimer"+i;
  kTimer[i] = (<td key={keku3}>({cookingClaim}/{maxCooking}) {timeString}</td>);
  const keku2 = "kButton"+i;
  const id_slot = i+1;
  if(timeleft+""==="ready"){
    kButton[i] = (<td key={keku2} onClick={() => {claimCook(id_slot,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}><button>Cook</button></td>);
  }
  else{
    kButton[i] = (<td key={keku2}> cooking.. </td>);  
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
                    </tbody>
                    </table>;
    setPacksL(global.config.imgPacksL);
  }
}


export default getCooking;