import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataBusService {

    private dataCache:any ={};

    constructor() {
    }

    setData(key:string,value:any){
        this.dataCache[key] = value;
    }

    getData(key:string){
        return this.dataCache[key];
    }

    getDataOnce(key:string){
        let tmp =  this.dataCache[key];
        if(tmp != null){
            delete this.dataCache[key];
        }
        return tmp;
    }

}
