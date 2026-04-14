import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AclDirective } from './acl.directive';
import { HyTemplateWrapper } from './hy-template-wrapper.directive';
import { HyTreeTemplateWrapper } from './hy-tree-template-wrapper.directive';
import { NcModelChangeDirective } from './nc-modelchange.directive';
import { HyFlexBoxDirective } from './hy-flex-box/hy-flex-box.directive';
import { HyFlexDirective } from './hy-flex-box/hy-flex.directive';
import { HyFullscreenDirective } from './hy-fullscreen/hy-fullscreen.directive';
import { HyGroupDirective } from './hy-group.directive';

const directive = [
    AclDirective,
    HyTemplateWrapper,
    HyTreeTemplateWrapper,
    NcModelChangeDirective,
    HyFlexBoxDirective,
    HyFlexDirective,
    HyFullscreenDirective,
    HyGroupDirective,
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: directive,
    exports: [...directive]
})
export class HyDirectiveModule { }
