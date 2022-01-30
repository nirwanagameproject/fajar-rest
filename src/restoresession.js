import getPacks from './getPacks.js'
import updateBalance from './updateBalance.js'

async function restoresession(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession){
    global.config.link.restoreSession(global.config.identifier).then((result) => {
        global.config.session = result;
        if (global.config.session) {
            setUserAccount(String(global.config.session.auth.actor));
            if(!loadSession){
              updateBalance(String(global.config.session.auth.actor),setBalanceAccount,setPropsAccount);
              getPacks(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount);
            }
            setLoadSession(true);
        }
    });
} 
export default restoresession;