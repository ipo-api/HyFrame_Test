import {Observable} from 'rxjs/internal/Observable';
import {throttleTime} from 'rxjs/operators';

export class ThrottleUtil {

  static createObserver(time,callbackFn){
    let tlObserver: any = null;
    Observable.create(observer => {
      tlObserver = observer;
    }).pipe(throttleTime(time))
      .subscribe(() => {
        callbackFn();
        }
      );
    return tlObserver;
  }

}
