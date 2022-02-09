import initilisasi from './initilisasi.js'

async function logout(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession){
  global.config.session = await initilisasi(timerCooking);
  try{
    setUserAccount('No wallet linked');
    setLoadSession(false);
    setBalanceAccount("");
    setPacksL('');
    setStatusContent('');
    setJudul('');
    setPropsAccount('');
    global.config.session.remove();
  }catch(err){

    console.log(err);
  }
}
export default logout;