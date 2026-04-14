import { HyIconClass } from "../../hy-icon/interface";

export interface HyCellBtnGroupBtnArray {
    /** 是否可点击 */
    enable?: any;
    /** 按钮名称 */
    title: string;
    /** 按钮样式 */
    color?: HyIconClass;
    /** 点击事件 */
    click?: (any?) => void;
}