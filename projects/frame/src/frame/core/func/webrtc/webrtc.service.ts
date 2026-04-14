import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRtcService {

  private ips = [];
  private ip_dups = {};

  public getRTCPeerConnection(configuration: RTCConfiguration,handleCandidate:Function):RTCPeerConnection{
    let self = this;
    let pc = new RTCPeerConnection(configuration);
    //listen for candidate events
    pc.onicecandidate = function(ice){
      //skip non-candidate events
      if(ice.candidate){
        handleCandidate(ice.candidate.candidate,self);
      }

    };

    //create a bogus data channel
    pc['createDataChannel']('');

    //create an offer sdp
    // pc.createOffer(function(result){
    //   //trigger the stun server request
    //   pc.setLocalDescription(result, function(){}, function(){});
    // }, function(){});

    pc.createOffer().then(result => pc.setLocalDescription(result));
    return pc;
  }

  public getExternalIP(){
    let self = this;
    return new Promise(function(resolve, reject) {
      //连接远程WebRTC的服务器，则获取的是 外网IP;  不连，获取的是局域网IP
      // let configuration = { iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }] };
      let configuration = { iceServers: [{ urls: 'stun:aaa' }] };
      let pc = self.getRTCPeerConnection(configuration,self.handleCandidate);
      //wait for a while to let everything done
      setTimeout(function(){
        //read candidate info from local description
        let lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
          if(line.indexOf('a=candidate:') === 0)
            self.handleCandidate(line,self);
        });

        resolve( self.ips.pop() );
      }, 1000);
    });
  }

  public handleCandidate(candidate,self){
    //match just the IP address
    let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
    let result = ip_regex.exec(candidate);

    if(!result) return;
    let ip_addr = result[1];

    //remove duplicates
    if(self.ip_dups[ip_addr] === undefined)
      self.ips.push(ip_addr);

    self.ip_dups = [];
  }

  public getIp(callbackFn:Function){
    this.getExternalIP().then(function(ip){
      callbackFn(ip); });
  }
}
