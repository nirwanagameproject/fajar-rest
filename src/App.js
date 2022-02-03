import React from 'react'
import './App.css';
//import * as waxjs from "@waxio/waxjs/dist";
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import {useEffect,useState} from 'react';
import Alert from 'react-popup-alert'

/* Initialization and Settup Global Variabel */
import './Init.js'

/* action Button */
import login from './login.js'
import logout from './logout.js'
import restoresession from './restoresession.js'

/* Update variabel of Content */
import updateMenu from './updateMenu.js'

/* Show data table */
import getNftPack from './getNftPack.js'
import getNftUnclaimPack from './getNftUnclaimPack.js'

import getPacks from './getPacks.js'
import getNft from './getNft.js'
import getNftTool from './getNftTool.js'
import getNftCuisine from './getNftCuisine.js'

import getDeposit from './getDeposit.js'
import getWithdraw from './getWithdraw.js'

import getRefill from './getRefill.js'
import getRefillEnergy from './getRefillEnergy.js'

import getRecipes from './getRecipes.js'
import getCooking from './getCooking.js'

import getCustomer from './getCustomer.js'

function App() {
  const [timerCooking,setTimerCooking] = useState(false);
  const [judul,setJudul] = useState('');
  const [loadSession,setLoadSession] = useState(false);
  const [userAccount,setUserAccount] = useState('No wallet linked');
  const [balanceAccount,setBalanceAccount] = useState('');
  const [propsAccount,setPropsAccount] = useState('');
  const [packsL,setPacksL] = useState('');
  const [statusContent,setStatusContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState({ type: 'error', text: 'This is a alert message',show: false});
  

  useEffect(() => {
    const transport = new AnchorLinkBrowserTransport();

    global.config.link = new AnchorLink({
      transport,
      chains: [{
          chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
          nodeUrl: 'https://testnet.waxsweden.org',
      }]
    });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !loadSession && !timerCooking) {
      restoresession(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession);
    }
  }, [isLoaded,loadSession,timerCooking]);

  return (
    <div className="App">
      <Alert
          header={alert.header}
          btnText={'Close'}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={alert.onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        />
      <h1>Fajar Crypto Restauran</h1>
      {
        loadSession && 
          <nav id='menu'>
            <input type='checkbox' id='responsive-menu' onClick={updateMenu} /><label></label>
            <ul>
              <li><a href={global.config.hrefVal} onClick={() => {getPacks(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Home</a></li>
              <li><a href={global.config.hrefVal} className='dropdown-arrow'>My NFT</a>
                <ul className='sub-menus'>
                  <li><a href={global.config.hrefVal} onClick={()=>{getNftPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>My Packs</a></li>
                  <li><a href={global.config.hrefVal} onClick={()=>{getNft(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>My Raw Material</a></li>
                  <li><a href={global.config.hrefVal} onClick={()=>{getNftTool(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>My Tools</a></li>
                  <li><a href={global.config.hrefVal} onClick={()=>{getNftCuisine(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}>My Cuisine</a></li>
                </ul>
              </li>
              <li><a href={global.config.hrefVal} onClick={() => {getPacks(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Buy Packs</a></li>
              <li><a href={global.config.hrefVal} onClick={() => {getCooking(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}>Cooking</a></li>
              <li><a href={global.config.hrefVal} onClick={() => {getCustomer(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}>My Restaurant</a></li>
              <li><a href={global.config.hrefVal} onClick={() => {getRefill(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Refill</a></li>
              <li><a href={global.config.hrefVal} onClick={() => {getDeposit(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Wallet</a></li>
              <li><a href={global.config.hrefVal} onClick={() => {logout(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession)}}>Log out</a></li>
            </ul>
          </nav>
      }
      {judul}
      {
        (statusContent === "Cooking") ? (<button onClick={() => {getRecipes(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>Recipes</button>)
        : (statusContent === "Recipes") && (<button onClick={() => {getCooking(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking)}}>Cooking</button>)
      }
      {
        (statusContent === "Packs") ? (<button onClick={()=>{getNftUnclaimPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>Unclaim Packs</button>)
        : (statusContent === "UnclaimPacks") && (<button onClick={()=>{getNftPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert)}}>My Packs</button>)
      }
      {
        (statusContent === "WalletDeposit") ? (<button onClick={() => {getWithdraw(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Withdraw</button>)
        : (statusContent === "WalletWithdraw") && (<button onClick={() => {getDeposit(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Deposit</button>)
      }
      {
        (statusContent === "RefillGas") ? (<button onClick={()=>{getRefillEnergy(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Energy</button>)
        : (statusContent === "RefillEnergy") && (<button onClick={()=>{getRefill(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)}}>Gas</button>)
      }
      <div id='balance'>Hello {userAccount} {balanceAccount}</div>
      <div id='props'>{propsAccount}</div>
      <div>
        {(!loadSession) && <button onClick={() => {login(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setUserAccount,loadSession,setLoadSession)}}>Login</button>}
      </div>
      <div>
        {packsL}
      </div>
    </div>
  );
}

export default App;
