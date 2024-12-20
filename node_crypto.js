/**
@desc RSA nodejs test

1 byte (8 bits) or sizeof(char)
4 bytes (32 bits)
8 bytes (64 bits)
16 bytes (128 bits) 
                                  */
import rl from "readline"
import cp from "node:crypto"
import {stdin,stdout,exit} from "process"

const r = rl.createInterface({
input:stdin,
output:stdout
})

class crypt {
  constructor(size){
    this.saltbuf = Buffer.alloc(size);
    this.iv = Buffer.alloc(16);
}
   randomsalt_iv_gen(){
    let res = cp.randomFill(this.saltbuf,(err,buf) => {
      if(err)throw err;
      console.log("Writing Salt to Buffer...(0x%s)",this.saltbuf.toString("hex").toUpperCase());
      });

    let iv_ = cp.randomFill(this.iv,(err,buf) => {
      if(err)throw err;
      console.log("Writing IV to Buffer...(0x%s)",this.iv.toString("hex").toUpperCase());
      });
}
  async keygen(str,salt,len){
    return new Promise((ret) => {
      cp.scrypt(str,salt,len,(err,keyy) => {
        if(err){
          console.error(err.cause);
        }
          ret(keyy);
      })
        })
  }
}

const main = async() => {
  const c = new crypt(16);
  c.randomsalt_iv_gen();
  var key = await c.keygen("jeps",c.saltbuf,16);
  console.log("Sizeof key(0x%s)",key.toString("hex").toUpperCase())
  let cph = cp.createCipheriv("aes-128-gcm",key,c.iv);
  r.question("Enter Word\n\u279c ",(i) => {
    const res = cph.update(i,"utf-8","hex").toUpperCase();
    cph.final();
    console.log("Encrypted Word (0x%s)",res);
    exit(0);
  })
}

main();
