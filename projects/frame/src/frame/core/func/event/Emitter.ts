import {ObjectUtil} from '../../util/common/ObjectUtil';
/**
 * 事件
 */
export class Emitter {
    /** 监听数组 */
    private static listeners = {};

    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static on(name: string, callback: Function, context?: any) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) {
            Emitter.listeners[name] = [];
        }
        Emitter.listeners[name].push(new Observer(callback, context));
    }

    /**
     * 注册事件 仅执行一次
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static once(name: string, callback: Function, context?: any) {
        let onceCB = function(...args: any[]){
            callback.call(context,...args);
            Emitter.off(name,onceCB,context);
        };
        Emitter.on(name,onceCB,context);
    }

    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static off(name: string, callback: Function, context?: any) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(callback)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete Emitter.listeners[name];
        }
    }

    /**
     * 发送事件
     * @param name 事件名称
     */
    public static emit(name: string, ...args: any[]) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) return;
        // for(let observer of observers){
        //     observer.notify(name, ...args);
        // }
        let observers_copy = [];
        observers_copy.push(...observers);

        let n = observers_copy.length;
        for (let i = 0; i < n; i++) {
            observers_copy[i].notify(name, ...args);
        }
    }
}

/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;

    constructor(callback: Function, context: any) {
        let self = this;
        self.callback = callback;
        self.context = context;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    notify(...args: any[]): void {
        let self = this;
        self.callback.call(self.context, ...args);
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    compar(callback: any): boolean {
        return callback == this.callback;
    }
}
