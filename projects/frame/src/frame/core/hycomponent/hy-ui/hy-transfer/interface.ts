
export interface HyTransferTemp {
  /** 类型 */
  tempType:'table' | 'tree';
  /** table专用 分页条数 */
  pageSize?:number;
  /** table专用 是否显示表头 */
  showHead?:boolean;
  /** table专用 滚动条配置 */
  scroll?: { x?: string,y?:string };
  /** table专用 cell配置 */
  cellConfigs?:Array<HyTransferCellConfig>;
}

export interface HyTransferCellConfig {
  /** 列名 */
  title:string;
  /** 列字段 */
  name:string;
  /** 列宽度 */
  width?:string;
  /** 类型 */
  type?:'text' | 'hyIcon' | 'nzIcon';
}

export interface HyTransferData{
  /** id */
  id:string;
  /** 标题 */
  title:string;
  /** 数据方向，左栏或右栏 */
  direction?:'left' | 'right';
  /** 海颐图标 */
  hyIconName?:string;
  /** 阿里图标 */
  nzIconName?:string;
  /** 隐藏 */
  hide?:boolean;
  /** 禁止点击 */
  disabled?:boolean;
}
