export class DataUnit {
    static copy(val) {
        let stringData = JSON.stringify(val);
        return JSON.parse(stringData);
    }
}