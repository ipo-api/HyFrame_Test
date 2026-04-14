import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HyCryptoService {


  constructor() {
  }

  /** 加密 */
  public encryptByAES(data, AESKey) {
    const key = CryptoJS.enc.Utf8.parse(AESKey);
    let encrypted = CryptoJS.AES.encrypt(data.toString(), key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: key });
    const ivCiphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    return ivCiphertext;
  }

  /** 解密 */
  public decryptedByAES(ciphertext, AESKey) {
    const key = CryptoJS.enc.Utf8.parse(AESKey);
    const ciphertextBytes = CryptoJS.enc.Base64.parse(ciphertext);
    const iv = key; // 使用 key 作为 iv
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertextBytes }, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
