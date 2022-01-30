import newUser from './newUser.js'

async function login(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession){
  try{
    global.config.link.login(global.config.identifier).then((result) => {
      newUser(result.session,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession);
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
    updateBalance(String(userku),setBalanceAccount,setPropsAccount);
  }catch(err){

  }*/
}
export default login;