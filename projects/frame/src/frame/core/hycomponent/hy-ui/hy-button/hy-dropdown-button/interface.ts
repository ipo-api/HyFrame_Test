export interface HyDropdownButtonObj {
    /** 标题 */
    title: string;
    /** 事件 */
    click: (any?) => void;
    /** 是否允许点击 */
    enable?: boolean;
    color?: 'red' | 'blue' | 'orange' | 'green' | 'pointer' | 'enable' | 'gray' | '' | null;
}
export type HyDropdownSize = 'large' | 'small' | 'default';
export type HyDropdownButtonTrigger = 'click' | 'hover';
export type HyDropdownMenuPlacement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
export type HyDropdownButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | null;