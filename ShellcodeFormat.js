/**
@desc Shellcode formatter from binary ninja output

Script cleans this kinda shellcodes out of the hex addresses on left into one long shellcode string
  
00407a50      "\x00\xfftt\x00\xffyq\x00\xff~v\x00\xffvy\x00\xff{\x7f\x00\xff~}\x00\00\xffm"
00407a50      "\x91\x00\xffm\x94\x00\xffs\x95\x00\xffv\x96\x00\xffy\x93\x00\xfc\x00\xff\x8"
00407a50      "\xff\x89\x98\x00\xf6\x9b\x93\x00\xf4\x9d\x9a\x00\xff\x9a\x9e\x00\xff\xa2\xa"
00407a50      "\xa2\xa4\x00\xff\xa4\xa6\x00\xff\xa2\xaf\x00\xf2\xa0\xb5\x00\x0\xff\xc0\xbf"
00407a50      "\xc2\x00\xff\xb3\xc4\x00\xff\xbf\xc1\x00\xff\xbd\xcb\x00\xff\xc2\xxff\xed\"
00407a50      "\x00\xff\xf1\xef\x00\xff\xf7\xf9\x00\xff\xfa\xfb\x00\xff\xfb\xfc\x00\xff\"            
                                                                                                     */
import fs from "fs"
import {argv} from "process"

function extractSc(in_,out){
    const content = fs.readFileSync(in_, 'utf8');
    const cleaned = content.replace(/^\w+\s+/gm, '');
    const shellcode = cleaned.match(/\\x[0-9a-fA-F]{2}/g);
    const shellcodeStr = shellcode ? shellcode.join('') : '';

    const hexString = shellcodeStr.replace(/\\x/g,'').replace(/\n/g,'');
    const binaryData = Buffer.from(hexString,'hex');

    fs.writeFileSync(out,binaryData);
    console.log(`Saved to [%s] \nArray size [%d]`,out,shellcodeStr.length);
}

let main = () => {
  const file_in = argv[2];
  const file_out = argv[3];
  extractSc(file_in,file_out);
}

main();
