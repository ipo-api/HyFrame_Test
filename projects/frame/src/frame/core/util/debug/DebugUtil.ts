import {AppGlobal} from '../../../config/AppGlobal';

export class DebugUtil {
  static init(){
    console['debug'] = (str:string)=>{
      if(AppGlobal.debug){
        console.warn('%c'+str,'color:#377837;')
      }
    }
  }

}
