import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavComponent {

    public logo: string = "assets/images/Angular_full_color_logo.svg";
    constructor(){}
}