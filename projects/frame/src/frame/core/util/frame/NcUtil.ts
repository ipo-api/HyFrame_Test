import {AppGlobal} from '../../../config/AppGlobal';
import * as JSEncrypt from 'jsencrypt';

export class NcUtil {

  static menu: any = {
    loopMenuDatas(menuDatas: any, callback: any, ops) {
      for (let i = 0; i < menuDatas.length; i++) {
        if (menuDatas[i]) {
          let step: number = this.dealMenuDatas_loop(menuDatas, menuDatas[i], i, callback, ops);
          i = i - step;
        }
      }
    },

    dealMenuDatas_loop(parentMenu: any, menu: any, index: any, callback: any, ops: any) {
      let delElementBackStep: any = {};
      let newOps = callback(parentMenu, menu, index, ops, delElementBackStep);
      if (menu.children) {
        for (let i = 0; i < menu.children.length; i++) {
          if (menu.children[i]) {
            let step: number = this.dealMenuDatas_loop(menu, menu.children[i], i, callback, newOps);
            i = i - step;
          }
        }
      }

      if (delElementBackStep && delElementBackStep.step) {
        return delElementBackStep.step;
      } else {
        return 0;
      }

    },
    menuDatas2TreeDatas(menuDatas: any) {
      let treeDatas = [];
      this.loopMenuDatas(menuDatas, this.menuData2TreeNode_callback, {'treeDatas': treeDatas});
      return treeDatas;
    },

    menuData2TreeNode_callback(parentMenu: any, menu: any, index: any, ops: any, delElementBackStep: any) {
      let treeDatas = ops.treeDatas;

      let treeNode: any = {};
      treeNode.name = menu.name;
      treeNode.menuId = menu.menuId;
      treeNode.open = true;
      if (menu.children) {
        treeNode.isParent = true;
        treeNode.children = [];
      }
      treeDatas.push(treeNode);

      return {treeDatas: treeNode.children};
    },

    menuDatas2HyTreeDatas(menuDatas: any) {
      let treeDatas = [];
      this.loopMenuDatas(menuDatas, this.menuData2HyTreeNode_callback, {'treeDatas': treeDatas});
      return treeDatas;
    },

    menuData2HyTreeNode_callback(parentMenu: any, menu: any, index: any, ops: any, delElementBackStep: any) {
      let treeDatas = ops.treeDatas;

      let treeNode: any = {};
      treeNode.title = menu.name;
      treeNode.id = menu.menuId;
      // treeNode.open = true;
      if (menu.children) {
        // treeNode.isParent = true;
        treeNode.children = [];
      }
      treeDatas.push(treeNode);

      return {treeDatas: treeNode.children};
    },


    getCheckedMenuDatas(menuDatas: any, checkedMenus: any) {
      this.loopMenuDatas(menuDatas, this.getCheckedMenuDatas_callback, {'checkedMenus': checkedMenus});
    },
    getCheckedMenuDatas_callback(parentMenu: any, menu: any, index: any, ops: any, delElementBackStep: any) {
      if (menu.menuId.length >= 4) {
        let checkedMenus = ops.checkedMenus;
        let isChecked = false;
        for (let i in checkedMenus) {
          let checkedMenu: any = checkedMenus[i];
          if (checkedMenu.menuId === menu.menuId) {
            isChecked = true;
            break;
          }
        }

        if (!isChecked) {
          parentMenu.children.splice(index, 1);
          delElementBackStep.step = 1;
        }
      }
      return ops;
    },
  };

  static xor_encode: any = {
    xor(key: string, bytes: any) {
      let output = [];
      let keyBytes = NcUtil.transform.stringToByte(key);
      for (let i = 0; i < bytes.length; i++) {
        let c = bytes[i];
        let k = keyBytes[i % keyBytes.length];
        output.push(c ^ k);
      }
      return output;
    }
  };

  static base64_encode_keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  static base64_encode: any = {
    // private property


    encode(input) {
      let output = '';
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;
      input = this._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          NcUtil.base64_encode_keyStr.charAt(enc1) + NcUtil.base64_encode_keyStr.charAt(enc2) +
          NcUtil.base64_encode_keyStr.charAt(enc3) + NcUtil.base64_encode_keyStr.charAt(enc4);
      }
      return output;
    },

    decode(input) {
      let output = '';
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (i < input.length) {
        enc1 = NcUtil.base64_encode_keyStr.indexOf(input.charAt(i++));
        enc2 = NcUtil.base64_encode_keyStr.indexOf(input.charAt(i++));
        enc3 = NcUtil.base64_encode_keyStr.indexOf(input.charAt(i++));
        enc4 = NcUtil.base64_encode_keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = this._utf8_decode(output);
      return NcUtil.transform.stringToByte(output);
    },

    _utf8_encode(string) {
      string = string.replace(/\r\n/g, '\n');
      let utftext = '';
      for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }
      return utftext;
    },

    _utf8_decode(utftext) {
      let string = '';
      let i = 0;
      let c, c1, c2, c3;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  };

  static transform: any = {
    byteToString(arr) {
      if (typeof arr === 'string') {
        return arr;
      }
      let str = '',
        _arr = arr;
      for (let i = 0; i < _arr.length; i++) {
        let one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
          let bytesLength = v[0].length;
          let store = _arr[i].toString(2).slice(7 - bytesLength);
          for (let st = 1; st < bytesLength; st++) {
            store += _arr[st + i].toString(2).slice(2);
          }
          str += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1;
        } else {
          str += String.fromCharCode(_arr[i]);
        }
      }
      return str;
    },

    stringToByte(str) {
      let bytes = [];
      let len, c;
      len = str.length;
      for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
          bytes.push(((c >> 18) & 0x07) | 0xF0);
          bytes.push(((c >> 12) & 0x3F) | 0x80);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
          bytes.push(((c >> 12) & 0x0F) | 0xE0);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
          bytes.push(((c >> 6) & 0x1F) | 0xC0);
          bytes.push((c & 0x3F) | 0x80);
        } else {
          bytes.push(c & 0xFF);
        }
      }
      return bytes;
    }

  }

  static rsa: any = {
    encrypt(pw: string): any {
      try {
        let jsencrypt = new JSEncrypt.JSEncrypt({default_key_size:'2048'});
        jsencrypt.setPublicKey(AppGlobal.puk);
        const npw = jsencrypt.encrypt(pw);
        return npw;
      } catch (e) {
      }
      return '';
    }
  };

}
