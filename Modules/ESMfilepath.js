import {dirname} from "path";
import {fileURLToPath} from "url";
/**   
@description ES Module env dirpath format
@param input retpath(import.meta.url); 
                                          */
export function retpath(url){
  return(dirname(fileURLToPath(url)));
}