import { Component } from "@angular/core";
import { AuthServise } from "src/app/modules/login/services/auth/auth.servise";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    public logo: string = "assets/images/Angular_full_color_logo.svg";

    constructor(
        public authServise: AuthServise
    ){}
}