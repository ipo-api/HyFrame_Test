
export class UrlUtil {

  static getProtocolAndDomain(url:string) {
    let returnStr:string = null;
    let strs = url.split('/'); //以“/”进行分割
    if (strs[0] && strs[2]) {
      returnStr = strs[0] + '//' + strs[2];
    }
    return returnStr;
  }

  static getDomain(url:string) {
    let domain:string = null;
    let strs = url.split('/'); //以“/”进行分割
    if (strs[2]) {
      domain = strs[2];
    }
    return domain;
  }

}
