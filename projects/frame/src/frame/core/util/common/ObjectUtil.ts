export class ObjectUtil {
    static copyByJson(src:any) {
        return JSON.parse(JSON.stringify(src));
    }

}
