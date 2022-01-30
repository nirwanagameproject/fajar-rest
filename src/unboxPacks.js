import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getNftUnclaimPack from './getNftUnclaimPack.js'

async function unboxPacks(assetId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  global.config.session = await global.config.link.restoreSession(global.config.identifier);
  const action = {
      account: 'atomicassets',
      name: 'transfer',
      authorization: [global.config.session.auth],
      data: {
        asset_ids : [assetId],
        from: (global.config.session.auth.actor),
        memo: "unbox",
        to: "atomicpacksx"
      }
  }
  //getNftUnclaimPack();
  await global.config.session.transact({action})
  .then(function(response){
    if(response.processed.receipt.status==="executed"){
      onShowAlert("success","Pack successfully unbox.Transaction at "+response.processed.id,"Pack Unboxed",() => {getNftUnclaimPack(setPacksL,setStatusContent,setJudul,timerCooking,setAlert);onCloseAlert(setAlert)},setAlert);
    }
  })
  .catch(function (e) {
    console.log(e);
    onShowAlert("error","Pack failed to unbox."+e,"Fail Unboxed",() => onCloseAlert(setAlert));
  })
}


export default unboxPacks;