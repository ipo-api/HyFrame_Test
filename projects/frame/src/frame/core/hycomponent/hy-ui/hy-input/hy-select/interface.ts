export interface HySelectItem {
    /** id */
    id: string;
    /** 值 */
    text: string;
    /** 框架内部使用 */
    showTip?: boolean;
}
export type HySelectMode = 'multiple' | 'default' | 'nowrapMultiple';