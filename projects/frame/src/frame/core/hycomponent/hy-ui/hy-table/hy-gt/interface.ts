export interface HyGtErrorData {
    /** 错误组件名 */
    modelName: string;
    /** 错误信息 */
    message: string
}

export interface HyGtErrorMessage {
    /** gt名 */
    gtName: string;
    /** 错误列表 */
    errorData: Array<HyGtErrorData>
}

export type HyGtClass = 'noBorder' | 'grayTitle' | 'bgTransparent' | 'gtStyle1';