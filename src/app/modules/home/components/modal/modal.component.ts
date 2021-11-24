import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    constructor() {}

    @Input() public title: string = '';
    @Input() public body: string = '';
    @Input() public name: string = 'Character name';
    @Output() public cancelEvent = new EventEmitter();
    @Output() public confirmEvent = new EventEmitter();

    public cancel(): void  {
        this.cancelEvent.emit();
    } 

    public confirm(): void {
        this.confirmEvent.emit();
    }
}