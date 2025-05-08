/** 
          */
import ax from "axios"
import {createQuery} from "./psyqlquery.js"
import {roatemp} from "./roaconsts.js"

export async function fetch(substanceName) {
  const query = createQuery(substanceName);
  const API_URL = 'https://api.psychonautwiki.org';

  try{
    const res = await ax.post(API_URL,{query:query}),dat = JSON.parse(JSON.stringify(res.data.data.substances,null,2));
    if(dat[0] == undefined){
      return("Invalid Query");
  }
    let sb = {
      drug:dat[0].name,
      units:[],
      roanames:[],
      roadoses:[],
      mglohi:[],
      mgavg:[],
      dur:[[],[]]
    }

  for(const a of dat[0].roas){
    sb.roanames.push(a.name);
    sb.roadoses.push(a.dose);
    sb.dur.push(a.duration)
  }

  const len = sb.roadoses.length;

  for(let i=0;i<=len;i++){
    if(sb.roadoses[i] != null){
      sb.mgavg.push((sb.roadoses[i].common.min+sb.roadoses[i].common.max)/2);
      sb.mglohi.push([sb.roadoses[i].common.min,sb.roadoses[i].common.max]);
      sb.units.push(sb.roadoses[i].units);
    }
    else{
      sb.mglohi.push("Null");
      sb.mgavg.push("Null");
    }
  }

    return await roatemp(sb,len)
  
    }catch(error){
      console.log(error)
  }
}


