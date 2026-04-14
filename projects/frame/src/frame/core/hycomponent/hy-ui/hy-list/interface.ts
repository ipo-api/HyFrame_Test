export interface HyListData {
    /** 标题 */
    title: string;
    /** 是否选中 */
    isSelected?: boolean;
    /** 弹出窗口 */
    visible?: boolean;
    /** 自定义属性值 */
    [name: string]: any;
};