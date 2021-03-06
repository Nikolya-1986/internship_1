import { Component, Output, EventEmitter, Input, ContentChild, ElementRef, Renderer2, AfterContentInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Gender } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-character-filter',
    templateUrl: './character-filter.component.html',
    styleUrls: ['./character-filter.component.scss']
})
export class CharacterFilterComponent implements AfterContentInit, AfterViewInit {

    @ContentChild('contentButton') contentButtonElementRef: ElementRef;
    @ViewChild('focusInput') focusInputElementRef:ElementRef;
    @Output() public currentGender = new EventEmitter<string>();
    @Output() public currentName = new EventEmitter<string>();
    @Output() public changeCurrentName = new EventEmitter<string>();
    @Input() public gender: Gender[];
    @Input() public filterGender: Gender = Gender.All;
    @Input() public filterName = 'Default';
    @Input() public searchName: string;
    @Input() public sortAlfabet: string[];

    constructor(
        private router: Router,
        private renderor: Renderer2,
    ){}

    public changeGender(): void {
        this.currentGender.emit(this.filterGender);
        this.router.navigate(['home'], {queryParams: { selectedGender: this.filterGender }, queryParamsHandling: 'merge'});
    };

    public changeName(): void {
        this.changeCurrentName.emit(this.filterName);
        this.router.navigate(['home'], {queryParams: { selectedSortName: this.filterName }, queryParamsHandling: 'merge'});
    };

    public searchCurrentName(): void {
        this.currentName.emit(this.searchName);
        this.router.navigate(['home'], {queryParams: { selectedSearchName: this.searchName }, queryParamsHandling: 'merge'});
    };

    public ngAfterViewInit(): void {
        this.focusInputElementRef.nativeElement.focus();
    };

    public ngAfterContentInit(): void {
        this.renderor.setStyle(this.contentButtonElementRef.nativeElement, "color","var(--primary-color-2)");
    }
}