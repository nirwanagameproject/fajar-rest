import initilisasi from './initilisasi.js'
import React,{memo} from 'react'

const ChildNama = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildImg = memo(({ nama, keyName }) => {
  return <td key={keyName} style={{textAlign:'center'}}><img src={nama} style={{width: '120px',height:'120px'}} alt={keyName}></img></td>;
});

const ChildNutrition = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildCosumtion = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildTools = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

const ChildFood = memo(({ nama, keyName }) => {
  return <td key={keyName}>{nama}</td>;
});

async function getRecipes(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking){
  global.config.session = await initilisasi(timerCooking);
  global.config.pageNumber = 1;
  global.config.imgPacksL = [];

  var hasil = await global.config.link.client.v1.chain.get_table_rows({
    code: "fajarmuhf123",
    index_position: 1,
    json: true,
    key_type: "i64",
    limit: global.config.tableLimit,
    lower_bound: global.config.tableLimit*(global.config.pageNumber-1)+1,
    reverse: false,
    scope: "fajarmuhf123",
    show_payer: false,
    table: "cuisine",
    upper_bound: global.config.tableLimit*(global.config.pageNumber)
  });
  var kNama = [];
  var kGambar = [];
  var kFood = [];
  var kTools = [];
  var kNutrition = [];
  var kCosumtion = [];
  var food_list = [];
  var tools_list = [];

  var banyak = hasil["rows"].length;
      
  for(var i=0;i<hasil["rows"].length;i++){
    const cNama = "kNama"+i;
    const cGambar = "kGambar"+i;
    const cFood = "kFood"+i;
    const cTools = "kTools"+i;
    const cNutrition = "kNutrition"+i;
    const cCosumption = "kCosumption"+i;
    const temp_id = hasil["rows"][i]["template_id"];
    const food_req = hasil["rows"][i]["food_req"];
    const tools_req = hasil["rows"][i]["tools_req"];
    const energy_req = hasil["rows"][i]["energy"];
    const charge_time_req = hasil["rows"][i]["charge_time"];
    const max_cooking_req = hasil["rows"][i]["max_cooking"];
    var gas_req = 0;

    const get_hasil = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=cuisine&limit=100");
    const json = await get_hasil.json();

    for(var j=0;j<json["data"].length;j++){
        if(""+json["data"][j]["template_id"]===""+temp_id){
          const name_cuisine = json["data"][j]["name"];
          const energy_cuisine = json["data"][j]["immutable_data"]["energy"];
          const karbohidrat_cuisine = json["data"][j]["immutable_data"]["karbohidrat"];
          const protein_cuisine = json["data"][j]["immutable_data"]["protein"];
          const lemak_cuisine = json["data"][j]["immutable_data"]["lemak"];
          kNama.push(<ChildNama key={cNama} keyName={cNama} nama={name_cuisine} />);

          const energyK = "energyK"+i;
          const karboK = "karboK"+i;
          const proteinK = "proteinK"+i;
          const lemakK = "lemakK"+i;

          const nutrition_list = [];
          nutrition_list.push(<li key={energyK}>energy : {energy_cuisine}</li>);
          nutrition_list.push(<li key={karboK}>karbohidrat : {karbohidrat_cuisine}</li>);
          nutrition_list.push(<li key={proteinK}>protein : {protein_cuisine}</li>);
          nutrition_list.push(<li key={lemakK}>lemak : {lemak_cuisine}</li>);

          const nutrition_content = [];
          nutrition_content.push(<p key="nutName">nutrition</p>);
          nutrition_content.push(<ul key="nutlist">{nutrition_list}</ul>);

          kNutrition.push(<ChildNutrition key={cNutrition} keyName={cNutrition} nama={nutrition_content} />);

          const gambar_cuisine = 'https://ipfs.io/ipfs/'+json["data"][j]["immutable_data"]["img"];
          kGambar.push(<ChildImg key={cGambar} keyName={cGambar} nama={gambar_cuisine} />);               

          const get_hasil_template = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=food&limit=100");
          const json2 = await get_hasil_template.json();

          tools_list=[];
          food_list=[];

          for(var k=0;k<json2["data"].length;k++){
              for(var l=0;l<food_req.length;l++){
                if(""+json2["data"][k]["template_id"] === ""+food_req[l]){
                  const liFood = "LiFood"+l+"_"+k+"_"+j;
                  const name_food = json2["data"][k]["name"];
                  const gambar_food = 'https://ipfs.io/ipfs/'+json2["data"][k]["immutable_data"]["img"];
                  const gas_food = json2["data"][k]["immutable_data"]["gas_cosumption"];
                  gas_req += parseInt(gas_food);
                  food_list.push(<li key={liFood}>
                    <table>
                      <thead>
                        <tr>
                          <td>{name_food}</td>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td><img src={gambar_food} style={{width: '120px',height:'120px'}} alt={liFood}/></td>
                      </tr>
                    </tbody>
                  </table></li>);
                  if(""+l===""+(food_req.length-1)){
                    const gas_cosumption_req = gas_req;
                    
                    const get_hasil_template_tools = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=tools&limit=100");
                    const json3 = await get_hasil_template_tools.json();

                    for(var k1=0;k1<json3["data"].length;k1++){
                        for(var l1=0;l1<tools_req.length;l1++){
                          if(""+json3["data"][k1]["template_id"] === ""+tools_req[l1]){            
                            const energyReqK = "energyReqK"+i;
                            const chargeTimeReqK = "chargetimeReqK"+i;
                            const maxCookingReqK = "maxcookingReqK"+i;
                            const gasReqK = "gasReqK"+i;

                            const cosumption_list = [];
                            cosumption_list.push(<li key={energyReqK}>energy : {energy_req}</li>);
                            cosumption_list.push(<li key={gasReqK}>gas : {gas_cosumption_req}</li>);
                            cosumption_list.push(<li key={chargeTimeReqK}>charge time : {charge_time_req}</li>);
                            cosumption_list.push(<li key={maxCookingReqK}>max cooking : {max_cooking_req}</li>);
                            
                            const consumption_content = [];
                            consumption_content.push(<p key="consName">cosumption</p>);
                            consumption_content.push(<ul key="consList">{cosumption_list}</ul>);
                            kCosumtion.push(<ChildCosumtion key={cCosumption} keyName={cCosumption} nama={consumption_content} />);

                            const liTools = "LiTools"+l1+"_"+k1+"_"+j;
                            const name_tools = json3["data"][k1]["name"];
                            const gambar_tools = 'https://ipfs.io/ipfs/'+json3["data"][k1]["immutable_data"]["img"];
                            tools_list.push(<li key={liTools}>
                              <table>
                                <thead>
                                  <tr>
                                    <td>{name_tools}</td>
                                  </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td><img src={gambar_tools} style={{width: '120px',height:'120px'}} alt={liTools}/></td>
                                </tr>
                              </tbody>
                            </table></li>);
                            if(""+l1===""+(tools_req.length-1)){
                              const tools_content = [];
                              tools_content.push(<p key="toolsName">tools require</p>);
                              tools_content.push(<ul key="listToolsNft">{tools_list}</ul>);
                              kTools.push(<ChildTools key={cTools} keyName={cTools} nama={tools_content} />);
                              const food_content = [];
                              food_content.push(<p key="foodName">food require</p>);
                              food_content.push(<ul key="listFoodNft">{food_list}</ul>);
                              
                              kFood.push(<ChildFood key={cFood} keyName={cFood} nama={food_content} />);
                            }
                          }
                        }
                      }
                  }
                }
              }
            }
        }
      }       
  }
  let kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kGambar,kNutrition,kCosumtion,kFood,kTools,kNama);}}>Load More</button></div>;
  let tableNow = "tables"+global.config.pageNumber;
  if(banyak > 0){
    global.config.imgPacksL.push(<table key={tableNow} align='center' style={{marginTop: '20px'}} >
        <thead>
          <tr key="nameNft">
            {kNama}
          </tr>
        </thead>
        <tbody>
          <tr key="gambarNft">
            {kGambar}
          </tr>
          <tr key="nutritionNft">
            {kNutrition}
          </tr>    
          <tr key="cosumptionNft">
            {kCosumtion}
          </tr>    
          <tr key="foodNft">
            {kFood}
          </tr> 
          <tr key="toolsNft">
            {kTools}
          </tr>   
        </tbody>
        </table>);
    global.config.imgPacksL.push(kLoadButton);
  }
  setPacksL(global.config.imgPacksL);
  setStatusContent("Recipes");  
  setJudul(<h2>List Recipes</h2>);
}
async function loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kGambar,kNutrition,kCosumtion,kFood,kTools,kNama){
  kNama = [];
  kGambar = [];
  kFood = [];
  kTools = [];
  kNutrition = [];
  kCosumtion = [];
  
  global.config.pageNumber++;

  var hasil = await global.config.link.client.v1.chain.get_table_rows({
    code: "fajarmuhf123",
    index_position: 1,
    json: true,
    key_type: "i64",
    limit: global.config.tableLimit,
    lower_bound: global.config.tableLimit*(global.config.pageNumber-1)+1,
    reverse: false,
    scope: "fajarmuhf123",
    show_payer: false,
    table: "cuisine",
    upper_bound: global.config.tableLimit*(global.config.pageNumber)
  });

  for(var i=0;i<hasil["rows"].length;i++){
    const cNama = "kNama"+i;
    const cGambar = "kGambar"+i;
    const cFood = "kFood"+i;
    const cTools = "kTools"+i;
    const cNutrition = "kNutrition"+i;
    const cCosumption = "kCosumption"+i;
    const temp_id = hasil["rows"][i]["template_id"];
    const food_req = hasil["rows"][i]["food_req"];
    const tools_req = hasil["rows"][i]["tools_req"];
    const energy_req = hasil["rows"][i]["energy"];
    const charge_time_req = hasil["rows"][i]["charge_time"];
    const max_cooking_req = hasil["rows"][i]["max_cooking"];
    var gas_req = 0;

    const get_hasil = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=cuisine&limit=100");
    const json = await get_hasil.json();

    for(var j=0;j<json["data"].length;j++){
        if(""+json["data"][j]["template_id"]===""+temp_id){
          const name_cuisine = json["data"][j]["name"];
          const energy_cuisine = json["data"][j]["immutable_data"]["energy"];
          const karbohidrat_cuisine = json["data"][j]["immutable_data"]["karbohidrat"];
          const protein_cuisine = json["data"][j]["immutable_data"]["protein"];
          const lemak_cuisine = json["data"][j]["immutable_data"]["lemak"];
          kNama.push(<ChildNama key={cNama} keyName={cNama} nama={name_cuisine} />);

          const energyK = "energyK"+i;
          const karboK = "karboK"+i;
          const proteinK = "proteinK"+i;
          const lemakK = "lemakK"+i;

          const nutrition_list = [];
          nutrition_list.push(<li key={energyK}>energy : {energy_cuisine}</li>);
          nutrition_list.push(<li key={karboK}>karbohidrat : {karbohidrat_cuisine}</li>);
          nutrition_list.push(<li key={proteinK}>protein : {protein_cuisine}</li>);
          nutrition_list.push(<li key={lemakK}>lemak : {lemak_cuisine}</li>);

          const nutrition_content = [];
          nutrition_content.push(<p key="nutName">nutrition</p>);
          nutrition_content.push(<ul key="nutlist">{nutrition_list}</ul>);

          kNutrition.push(<ChildNutrition key={cNutrition} keyName={cNutrition} nama={nutrition_content} />);

          const gambar_cuisine = 'https://ipfs.io/ipfs/'+json["data"][j]["immutable_data"]["img"];
          kGambar.push(<ChildImg key={cGambar} keyName={cGambar} nama={gambar_cuisine} />);               

          const get_hasil_template = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=food&limit=100");
          const json2 = await get_hasil_template.json();

          const tools_list=[];
          const food_list=[];

          for(var k=0;k<json2["data"].length;k++){
              for(var l=0;l<food_req.length;l++){
                if(""+json2["data"][k]["template_id"] === ""+food_req[l]){
                  const liFood = "LiFood"+l+"_"+k+"_"+j;
                  const name_food = json2["data"][k]["name"];
                  const gambar_food = 'https://ipfs.io/ipfs/'+json2["data"][k]["immutable_data"]["img"];
                  const gas_food = json2["data"][k]["immutable_data"]["gas_cosumption"];
                  gas_req += parseInt(gas_food);
                  food_list.push(<li key={liFood}>
                    <table>
                      <thead>
                        <tr>
                          <td>{name_food}</td>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td><img src={gambar_food} style={{width: '120px',height:'120px'}} alt={liFood}/></td>
                      </tr>
                    </tbody>
                  </table></li>);
                  if(""+l===""+(food_req.length-1)){
                    const gas_cosumption_req = gas_req;
                    
                    const get_hasil_template_tools = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=tools&limit=100");
                    const json3 = await get_hasil_template_tools.json();

                    for(var k1=0;k1<json3["data"].length;k1++){
                        for(var l1=0;l1<tools_req.length;l1++){
                          if(""+json3["data"][k1]["template_id"] === ""+tools_req[l1]){            
                            const energyReqK = "energyReqK"+i;
                            const chargeTimeReqK = "chargetimeReqK"+i;
                            const maxCookingReqK = "maxcookingReqK"+i;
                            const gasReqK = "gasReqK"+i;

                            const cosumption_list = [];
                            cosumption_list.push(<li key={energyReqK}>energy : {energy_req}</li>);
                            cosumption_list.push(<li key={gasReqK}>gas : {gas_cosumption_req}</li>);
                            cosumption_list.push(<li key={chargeTimeReqK}>charge time : {charge_time_req}</li>);
                            cosumption_list.push(<li key={maxCookingReqK}>max cooking : {max_cooking_req}</li>);
                            
                            const consumption_content = [];
                            consumption_content.push(<p key="consName">cosumption</p>);
                            consumption_content.push(<ul key="consList">{cosumption_list}</ul>);
                            kCosumtion.push(<ChildCosumtion key={cCosumption} keyName={cCosumption} nama={consumption_content} />);

                            const liTools = "LiTools"+l1+"_"+k1+"_"+j;
                            const name_tools = json3["data"][k1]["name"];
                            const gambar_tools = 'https://ipfs.io/ipfs/'+json3["data"][k1]["immutable_data"]["img"];
                            tools_list.push(<li key={liTools}>
                              <table>
                                <thead>
                                  <tr>
                                    <td>{name_tools}</td>
                                  </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td><img src={gambar_tools} style={{width: '120px',height:'120px'}} alt={liTools}/></td>
                                </tr>
                              </tbody>
                            </table></li>);
                            if(""+l1===""+(tools_req.length-1)){
                              const tools_content = [];
                              tools_content.push(<p key="toolsName">tools require</p>);
                              tools_content.push(<ul key="listToolsNft">{tools_list}</ul>);
                              kTools.push(<ChildTools key={cTools} keyName={cTools} nama={tools_content} />);
                              const food_content = [];
                              food_content.push(<p key="foodName">food require</p>);
                              food_content.push(<ul key="listFoodNft">{food_list}</ul>);
                              
                              kFood.push(<ChildFood key={cFood} keyName={cFood} nama={food_content} />);
                            }
                          }
                        }
                      }
                  }
                }
              }
            }
        }
      }       
  }

  let kLoadButton = <div key="lastLoadButton" style={{marginTop:12}}><button onClick={() => {loadmore(setPacksL,setStatusContent,setJudul,timerCooking,setAlert,setBalanceAccount,setPropsAccount,setTimerCooking,kGambar,kNutrition,kCosumtion,kFood,kTools,kNama);}}>Load More</button></div>;
  var banyak = hasil["rows"].length;
  let tableNow = "tables"+global.config.pageNumber;
  global.config.imgPacksL.pop();
  if(banyak > 0){
    global.config.imgPacksL.push(<table key={tableNow} align='center' style={{marginTop: '20px'}} >
        <thead>
          <tr key="nameNft">
            {kNama}
          </tr>
        </thead>
        <tbody>
          <tr key="gambarNft">
            {kGambar}
          </tr>
          <tr key="nutritionNft">
            {kNutrition}
          </tr>    
          <tr key="cosumptionNft">
            {kCosumtion}
          </tr>    
          <tr key="foodNft">
            {kFood}
          </tr> 
          <tr key="toolsNft">
            {kTools}
          </tr>   
        </tbody>
        </table>);
    global.config.imgPacksL.push(kLoadButton);
  }
  setPacksL(global.config.imgPacksL);
  setStatusContent("Recipes");  
  setJudul(<h2>List Recipes</h2>);
}
export default getRecipes;