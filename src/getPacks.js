import initilisasi from './initilisasi.js'
import buyPacks from './buyPacks.js'
import React,{ memo } from 'react'

const ChildNama = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildImg = memo(({ nama, keyName }) => {
  return <td key={keyName} style={{textAlign:'center'}}><img src={nama} style={{width: '120px',height:'120px'}} alt={keyName}></img></td>;
});

const ChildButton = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

async function getPacks(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount){
  global.config.session = await initilisasi(timerCooking);

  fetch(
    "https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=packs&limit=10")
  .then((res) => res.json())
  .then(async (json) => {

      var hasil = await global.config.link.client.v1.chain.get_table_rows({
        code: "fajarmuhf123",
        index_position: 1,
        json: true,
        key_type: "",
        limit: "100",
        lower_bound: null,
        reverse: false,
        scope: "fajarmuhf123",
        show_payer: false,
        table: "priceitem",
        upper_bound: null
      });

      let nameContent=[];
      let descContent=[];
      let priceContent=[];
      let gambarContent=[];
      let buttonContent=[];

      for(var i=0;i<json["data"].length;i++){
        var descPacks = (json["data"][i]["immutable_data"]["description"]);
        var namePacks = (json["data"][i]["name"]);
        var idPacks = (json["data"][i]["template_id"]);
        var gambarPacks = 'https://ipfs.io/ipfs/'+(json["data"][i]["immutable_data"]["img"]);

        for(var j=0;j<hasil["rows"].length;j++){
          if(idPacks+"" === ""+hasil["rows"][j]["template_id"]){
            let nameNow = "nameNft"+i;
            let imgNftNow = "imageNft"+i;
            let priceNow = "priceNft"+i;
            let gambarNow = "gambarNft"+i;
            let buttonNow = "buttonNft"+i;

            const idPacks = hasil["rows"][j]["template_id"];

            
            const pricePacks = hasil["rows"][j]["price"];
            const fungsi = () => {buyPacks(idPacks,(global.config.session.auth.actor),pricePacks,setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount)};
            nameContent.push(<ChildNama key={nameNow} keyName={nameNow} nama={namePacks} />);
            descContent.push(<td key={imgNftNow}>{descPacks}</td>);
            priceContent.push(<td key={priceNow}>{pricePacks}</td>);
            gambarContent.push(<ChildImg key={gambarNow} keyName={gambarNow} nama={gambarPacks} />);
            const buttonPush= <button onClick={fungsi}>Buy Now</button>;
            buttonContent.push(<ChildButton key={buttonNow} keyName={buttonNow} nama={buttonPush} />);
          }
        }
      }


      global.config.imgPacksL = 
                  <table align="center" style={{marginTop: '20px'}} >
                    <thead>
                      <tr>
                        {nameContent}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {gambarContent}
                      </tr>
                      <tr>
                        {descContent}
                      </tr>
                      <tr>
                        {priceContent}
                      </tr>
                      <tr>
                        {buttonContent}
                      </tr>
                    </tbody>
                  </table>;
      setPacksL(global.config.imgPacksL);

      setStatusContent("BuyPacks");
      setJudul(<h2>Buy Packs</h2>);
  })
}

export default getPacks;