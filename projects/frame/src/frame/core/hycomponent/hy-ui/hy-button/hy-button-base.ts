import { ElementRef } from "@angular/core";
import { HyFormService } from "../../../common/domain/service/hyform.service";
import { I18nService } from "../../../service/i18n.service";

export class HyButtonBase {

  /** 是否存在下一个按钮 */
  public hasNextButton: boolean = false;

  /** 是否存在上一个按钮 */
  public hasPrevButton: boolean = false;

  private nodeNameList: string[] = ['HY-BUTTON', 'HY-DROPDOWN-BUTTON','HYB-BUTTON'];


  constructor(public formService: HyFormService, public i18nService: I18nService, public el: ElementRef) {

  }

  public init() {
    const nextNode = this.getPrevAndNextNode(this.el.nativeElement, 'next');
    const prevNode = this.getPrevAndNextNode(this.el.nativeElement, 'prev');

    // 如果后一个节点存在，则添加mr12类
    if(nextNode){
      this.el.nativeElement.classList.add('mr12');
    }
    // 如果前一个节点存在，并且没有ml12类，则添加ml12类
    if(prevNode && !prevNode.classList.contains('ml12')){
      this.el.nativeElement.classList.add('ml12');
    }
  }

  /** 获取前后一个节点，看是否有hy-button */
  private getPrevAndNextNode(element: Element, type: 'next' | 'prev'):Element {
    if (!element) return null;
    const sibling = type === 'next' ? element.nextSibling as Element : element.previousSibling as Element;
    if (sibling?.nodeName === '#comment') {
      return this.getPrevAndNextNode(sibling, type);
    } else {
      if (this.nodeNameList.includes(sibling?.nodeName)) {
        if (type === 'next') {
          return sibling;
        } else {
          if (!sibling.classList.contains('mr12')) {
            return sibling;
          }else{
            return null;
          }
        }
      }
      return null;
    }
  }
}