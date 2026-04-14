export interface ConfigureConfig {
    /** websocket endpoint */
    host: string;
    /** optional headers */
    headers?: Object;
    /** heartbeats (ms) */
    heartbeatIn?: number;
    heartbeatOut?: number;
    /** debuging */
    debug?: boolean;
    /** reconnection time (ms) */
    recTimeout?: number;
    /** queue object */
    queue: any;
    /** queue cheking Time (ms) */
    queueCheckTime?: number;
}