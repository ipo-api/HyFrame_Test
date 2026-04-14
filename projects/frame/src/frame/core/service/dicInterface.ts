
export interface HyDicData {
  /** 字典名 */
  name:string;
  /** 字典值 */
  value:Array<HyDicValue>;
}

export interface HyDicValue {
  /** 对应id */
  id:string;
  /** 字段标题 */
  text:string;
}
