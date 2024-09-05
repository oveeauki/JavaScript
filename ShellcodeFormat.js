/**
@author 0xFreDi
                */
import fs from "fs"

/**
 * @desc Shellcode formatter and cleaner
 * @param {String} in_ shellcode input txt file path
 * @param {String} out outputs .BIN in given path
 * @argument Usage extractSc(inputfile,output.bin);
                                                */
export function extractSc(in_,out){
  const content = fs.readFileSync(in_,'utf8');
  const cleaned = content.replace(/^\w+\s+/gm, '');
  const shellcode = cleaned.match(/\\x[0-9a-fA-F]{2}/g);
  const shellcodeStr = shellcode ? shellcode.join('') : '';
  const hexString = shellcodeStr.replace(/\\x/g,'').replace(/\n/g,'');
  const binaryData = Buffer.from(hexString,'hex');
  
  const disp = shellcode.map(jo => jo.replace("\\",""));
  fs.writeFileSync(out,binaryData);
  console.log(`Shellstring:%s\n\nSaved to [%s] \nShellcode sizeof (%d)Bytes`,disp,out,shellcodeStr.length);
}
