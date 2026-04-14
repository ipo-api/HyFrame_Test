import {OnInit, Directive, Output, Input, EventEmitter} from '@angular/core';

@Directive({
    selector: '[ncModelChange]'
})
export class NcModelChangeDirective implements OnInit {
    _ncModelChange_Old:any;

    @Input()
    set ncModelChange(ncModelChange:any) {
        if(this._ncModelChange_Old !== ncModelChange){
            this.onChange_model.emit(ncModelChange);
            this._ncModelChange_Old = ncModelChange;
        }
    }

    get ncModelChange() {
        return this._ncModelChange_Old;
    }

    @Output()
    onChange_model = new EventEmitter<any>();


    constructor() {

    }

    ngOnInit() {

    }
}
