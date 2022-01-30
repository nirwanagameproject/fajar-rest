import onShowAlert from './onShowAlert.js'
import onCloseAlert from './onCloseAlert.js'
import getClaimedNft from './getClaimedNft.js'

async function claimPacks(assetId,setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  var json = await global.config.link.client.v1.chain.get_table_rows({
    code: "atomicpacksx",
    index_position: 1,
    json: true,
    key_type: "",
    limit: 1000,
    lower_bound: "",
    reverse: false,
    scope: assetId,
    show_payer: false,
    table: "unboxassets",
    upper_bound: ""
  });
  console.log(json);

  global.config.session = await global.config.link.restoreSession(global.config.identifier);
  const action = {
      account: 'atomicpacksx',
      name: 'claimunboxed',
      authorization: [global.config.session.auth],
      data: {
        origin_roll_ids: [json["rows"][0]["origin_roll_id"]],
        pack_asset_id : assetId
      }
  }
  await global.config.session.transact({action})
  .then(function(response){
    if(response.processed.receipt.status==="executed"){
      onShowAlert("success","Pack successfully claimed.Transaction at "+response.processed.id,"Pack Claimed",() => {getClaimedNft(response.processed.id,setPacksL,setStatusContent,setJudul,timerCooking,setAlert);onCloseAlert(setAlert)},setAlert);
    }
  })
  .catch(function (e) {
    console.log(e);
    onShowAlert("error","Pack failed to claim."+e,"Fail Claimed",() => onCloseAlert(setAlert),setAlert);
  })
}
export default claimPacks;