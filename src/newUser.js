import restoresession from './restoresession.js'

async function newUser(sesi,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession){
  let userKu = sesi.auth.actor;
  var hasil = await global.config.link.client.v1.chain.get_table_rows({
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
        global.config.session = sesi;
        restoresession(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession);
    }).catch(function (e) {
        sesi.remove();
    });
  }
  else{        
    global.config.session = sesi;
    restoresession(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession);
  }
}
export default newUser;