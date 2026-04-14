import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppGlobal} from '../../../config/AppGlobal';
import {Emitter} from '../event/Emitter';
import {ED} from '../../../config/EventDefined';
import {Injectable} from '@angular/core';
import { ConfigureConfig } from './interface';

declare function unescape(s:string): string;



export enum WskAction {
  Send = <any>'send',
  Subscribe = <any>'Subscribe',
}

@Injectable({
  providedIn: 'root',
})
export class StompService {

  public config:any = null;

  private socket: any;

  public stomp: any;

  private timer: any;

  private resolveConPromise: (...args: any[]) => void;
  public queuePromises = [];

  private disconnectPromise: any;
  private resolveDisConPromise: (...args: any[]) => void;

  public status: string;

  public baseUrl: String;

  public defaultConfig: any;

  constructor() {
    this.baseUrl = (AppGlobal.server ? AppGlobal.server : '') + '/' + (AppGlobal.project ? AppGlobal.project + '/' : '');
    this.defaultConfig = {
      host: this.baseUrl + AppGlobal.wsk_socket,
      debug: false,
      queue: {'init': false}
    };

    this.status = 'CLOSED';

    //Create promise
    this.disconnectPromise = new Promise(
      (resolve, reject) => this.resolveDisConPromise = resolve
    );
  }

  public init = function () {
    if (this.status === 'CLOSED') {
      this.startConnect().then(() => {
        this.done('init');
      });
    }
  };

  public doWork = function (url:string,action:WskAction,map:any,ops: any) {
    let self = this;
    ops = ops || {};

    let dealResult = function(resBody){
      if(resBody.success){
        if(ops.successFn){
          ops.successFn(resBody);
        }
      }else{
        if(resBody.msg){
          alert(resBody.msg);
        }
      }
    };

    if (this.status !== 'CONNECTED') {
      self.init();
      if(action === WskAction.Send){
        let cb = function(){
          self.send(url, ops.datas, ops.heads);
        };
        Emitter.once(ED.WSK_Connected,cb);
      }else if(action === WskAction.Subscribe){
        let cb = function(){
          map[url] = self.subscribe(url, dealResult, ops.headers);
        };
        Emitter.once(ED.WSK_Connected,cb);
      }
    } else {
      if(action === WskAction.Send){
        this.send(url, ops.datas, ops.heads);
      }else if(action === WskAction.Subscribe){
        map[url] = this.subscribe(url, dealResult, ops.headers);
      }
    }
  };

  /**
   * Configure
   */
  public configure(config: ConfigureConfig): void {
    this.config = config;
  }

  /**
   * Try to establish connection to server
   */
  public startConnect(): Promise<{}> {
    if (this.config === null) {
      this.configure(this.defaultConfig);
    }

    this.status = 'CONNECTING';

    //Prepare Client
    this.socket = new SockJS(this.config.host,[],{});
    this.stomp = Stomp.over(this.socket);

    this.stomp.heartbeat.outgoing = this.config.heartbeatOut || 10000;
    this.stomp.heartbeat.incoming = this.config.heartbeatIn || 10000;

    //Debuging connection
    if (this.config.debug) {
      this.stomp.debug = function (str) {
        console.debug(str);
      };
    } else {
      this.stomp.debug = false;
    }

    //Connect to server
    this.stomp.connect(this.config.headers || {}, this.onConnect, this.onError);
    return new Promise(
      (resolve, reject) => this.resolveConPromise = resolve
    );

  }


  /**
   * Successfull connection to server
   */
  public onConnect = (frame: any) => {
    this.status = 'CONNECTED';
    this.resolveConPromise();
    this.timer = null;

    Emitter.emit(ED.WSK_Connected);

    //console.log('Connected: ' + frame);
  };

  /**
   * Unsuccessfull connection to server
   */
  public onError = (error: string) => {

    console.error(`Error: ${error}`);

    // Check error and try reconnect
    if (error.indexOf('Lost connection') !== -1) {
      if (this.config.debug) {
        console.debug('Reconnecting...');
      }
      this.timer = setTimeout(() => {
        this.startConnect();
      }, this.config.recTimeout || 5000);
    }
  };

  /**
   * Subscribe
   */
  public subscribe(destination: string, callback: any, headers?: Object) {
    headers = headers || {};
    return this.stomp.subscribe(destination, function (response) {
      let message = JSON.parse(response.body);
      let headers = response.headers;
      callback(message, headers);
    }, headers);
  }

  /**
   * Unsubscribe
   */
  public unsubscribe(subscription: any) {
    subscription.unsubscribe();
  }


  /**
   * Send
   */
  public send(destination: string, body: any, headers?: Object): void {
    let message = JSON.stringify(body);
    headers = headers || {};
    this.stomp.send(destination, headers, message);
  }


  /**
   * Disconnect stomp
   */
  public disconnect(): Promise<{}> {
    this.stomp.disconnect(() => {
      this.resolveDisConPromise();
      this.status = 'CLOSED'
    });
    return this.disconnectPromise;
  }


  /**
   * After specified subscription
   */
  public after(name: string): Promise<{}> {
    this.nameCheck(name);
    if (this.config.debug) console.debug('checking ' + name + ' queue ...');
    let checkQueue = setInterval(() => {
      if (this.config.queue[name]) {
        clearInterval(checkQueue);
        this.queuePromises[name]();
        if (this.config.debug) console.debug('queue ' + name + ' <<< has been complated');
        // return false;
      }
    }, this.config.queueCheckTime || 100);

    if (!this.queuePromises[name + 'promice']) {
      this.queuePromises[name + 'promice'] = new Promise(
        (resolve, reject) => this.queuePromises[name] = resolve
      );
    }
    return this.queuePromises[name + 'promice'];
  }


  /**
   * Done specified subscription
   */
  public done(name: string): void {
    this.nameCheck(name);
    this.config.queue[name] = true;
  }


  /**
   * Turn specified subscription on pending mode
   */
  public pending(name: string): void {
    this.nameCheck(name);
    this.config.queue[name] = false;
    if (this.config.debug) console.debug('queue ' + name + ' <<<<<<  turned on pending mode');
  }


  /**
   * Check name in queue
   */
  private nameCheck(name: string): void {
    if (!this.config.queue.hasOwnProperty(name)) {
      throw Error('\'' + name + '\' has not found in queue');
    }
  }
}
