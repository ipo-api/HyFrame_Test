export interface HyTreeSelectNode {
  /** 标题 */
  title: string;
  /** key */
  key: string;
  /** 设置为叶子节点(叶子节点不可被拖拽模式放置) */
  isLeaf?: boolean;
  /** 设置节点 Checkbox 是否选中 */
  checked?: boolean;
  /** 设置节点本身是否选中 */
  selected?: boolean;
  /** 设置节点是否可被选中 */
  selectable?: boolean;
  /** 设置是否禁用节点(不可进行任何操作) */
  disabled?: boolean;
  /** 设置节点禁用 Checkbox */
  disableCheckbox?: boolean;
  /** 设置节点是否展开(叶子节点无效) */
  expanded?: boolean;
  /** 当前的层级 */
  level?: number;
  /** 子节点 */
  children?: HyTreeSelectNode[];
  [key: string]: any;
}