export interface HyTabs {
    /** 页签ID */
    id?: string;
    /** 页签标题 */
    title: string;
    /** 页签图标 */
    icon?: string;
    /** 路由模式的页签跳转路径 */
    url?: string;
    /** 是否显示关闭按钮 */
    isShowClose?:boolean;
    /** 右上角的数字 */
    count?:number;
    [name: string]: any;
}