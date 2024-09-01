/** 
@auth oveeauki
              */
import fs from "fs/promises"

async function formatBase64String(base64String,lineLength = 80){
  const chunks = [];
  for(let i=0;i<base64String.length;i += lineLength){
    chunks.push(base64String.slice(i,i+lineLength));
  }
  return('"' + chunks.join('" + \n"') + '";');
}

function base64ToBuffer(b64){
  const buffer = Buffer.from(b64,'base64');
  return(buffer);
}

/**
@description Formats Base64 strigns into proper format and 
inputs it into .bin file ready for decompilation
@param input shellcodetobin(shellstring,path,filename);
@returns formatted base64 string (Final output in the .bin file)
                                                                */
export async function shellcodetobin(shellstring,path,filename){
  try{
    const bs64formatted = await formatBase64String(shellstring);
    console.log("Formatted Shellcode:\n\n%s\n",bs64formatted);
    const decodedBuffer = base64ToBuffer(bs64formatted);
    await fs.writeFile(path+filename,decodedBuffer);
    console.log('Decoded data has been written to [%s] with sizeof(%d)\n',filename,decodedBuffer.length);
    return(decodedBuffer.length);
  }catch(err){
      console.error('Error:',err);
    }
}
