import initilisasi from './initilisasi.js'
import React from 'react'

async function getRecipes(setPacksL,setStatusContent,setJudul,timerCooking,setAlert){
  global.config.session = await initilisasi(timerCooking);

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
    table: "cuisine",
    upper_bound: null
  });
  var kNama = [];
  var kGambar = [];
  var kFood = [];
  var kTools = [];
  var kNutrition = [];
  var kCosumtion = [];
      
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
          const food_list = [];
          const tools_list = [];
          kNama.push(<td key={cNama}>{name_cuisine}</td>);

          const energyK = "energyK"+i;
          const karboK = "karboK"+i;
          const proteinK = "proteinK"+i;
          const lemakK = "lemakK"+i;
          const FoodK = "LiFood"+i;

          const nutrition_list = [];
          nutrition_list.push(<li key={energyK}>energy : {energy_cuisine}</li>);
          nutrition_list.push(<li key={karboK}>karbohidrat : {karbohidrat_cuisine}</li>);
          nutrition_list.push(<li key={proteinK}>protein : {protein_cuisine}</li>);
          nutrition_list.push(<li key={lemakK}>lemak : {lemak_cuisine}</li>);

          kNutrition.push(<td key={cNutrition}><p>nutrition</p><ul>{nutrition_list}</ul></td>);

          const gambar_cuisine = 'https://ipfs.io/ipfs/'+json["data"][j]["immutable_data"]["img"];
          kGambar.push(<td key={cGambar}><img src={gambar_cuisine} style={{width: '120px',height:'120px'}} alt={FoodK} /></td>);               

          const get_hasil_template = await fetch("https://test.wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=fajarmuhf123&schema_name=food&limit=100");
          const json2 = await get_hasil_template.json();

          for(var k=0;k<json2["data"].length;k++){
              for(var l=0;l<food_req.length;l++){
                if(""+json2["data"][k]["template_id"] === ""+food_req[l]){
                  const liFood = "LiFood"+l;
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
                            
                            kCosumtion.push(<td key={cCosumption}><p>cosumption</p><ul>{cosumption_list}</ul></td>);

                            const liTools = "LiTools"+l1;
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
                              kTools.push(<td key={cTools}><p>tools require</p><ul>{tools_list}</ul></td>);
                              kFood.push(<td key={cFood}><p>food require</p><ul>{food_list}</ul></td>);
                              global.config.imgPacksL = <table align='center' style={{marginTop: '20px'}} >
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
                                              </table>;
                              setPacksL(global.config.imgPacksL);
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

  setStatusContent("Recipes");  
  setJudul(<h2>List Recipes</h2>);
}
export default getRecipes;