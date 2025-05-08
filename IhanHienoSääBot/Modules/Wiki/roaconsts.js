/*

        */
export async function roatemp(sb = {},len){
  return new Promise((res) => {    
   let final = `\n[${sb.drug}]`;
     for(let i=0;i<len;i++){
       if(sb.roadoses[i] == null){
         break;
     }
       const roa = `\
       \nROA:(${sb.roanames[i]})\
       \nLow:(${sb.mglohi[i][0]})${sb.units[i]}/Avg:(${sb.mgavg[i]})${sb.units[i]}/High(${sb.mglohi[i][1]})${sb.units[i]}\n`
       final += roa;
   }
     res(final);
 })
}