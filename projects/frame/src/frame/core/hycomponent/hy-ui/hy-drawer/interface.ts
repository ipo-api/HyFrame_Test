
export interface HyDrawerOptions {
  /** 抽屉标题 */
  title?:any;
  /** 宽度 */
  width?:any;
  /** 是否显示右上角的关闭按钮 */
  closable?:any;
  /** 点击蒙层是否允许关闭 */
  maskClosable?:any;
  /** 是否展示遮罩,默认展示遮罩 */
  mask?:any;
  /** //点击蒙层、右上角x、调用close方法，以上三种方式关闭抽屉之后的回调 */
  afterCloseCallback?():any; 
  /** 点击蒙层、右上角X，关闭抽屉的方法 */
  onClickClose?():any;
}
