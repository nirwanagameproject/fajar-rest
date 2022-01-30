async function updateBalance(userStr,setBalanceAccount,setPropsAccount){
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
  var frcoin = "0.0000";
  var frgas = "0.0000";
  var frenergy = "0.0000";
  let gas = 0;
  let max_gas = 0;
  let energy = 0;
  let max_energy = 0;
  for(var i=0;i<hasil["rows"].length;i++){
    gas=hasil["rows"][i]["gas"];
    max_gas=hasil["rows"][i]["max_gas"];
    energy=hasil["rows"][i]["energy"];
    max_energy=hasil["rows"][i]["max_energy"];

    if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRCOIN"){
      frcoin=hasil["rows"][i]["balance"][0].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRGAS"){
      frgas=hasil["rows"][i]["balance"][0].split(" ")[0];
    }
    if(hasil["rows"][i]["balance"][0].split(" ")[1]=="FRENERG"){
      frenergy=hasil["rows"][i]["balance"][0].split(" ")[0];
    }    
  }
  let bal = ", FRCOIN = "+frcoin+", FRGAS = "+frgas+", FRENERG = "+frenergy;
  let prop = "gas = ("+gas+"/"+max_gas+"), energy = ("+energy+"/"+max_energy+")";
  setBalanceAccount(bal);
  setPropsAccount(prop);  
}
export default updateBalance;