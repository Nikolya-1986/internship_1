import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeCharacterCardComponent } from "./components/home-character-card.component";

@NgModule({
    declarations: [
        HomeCharacterCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "", component: HomeCharacterCardComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HomeCharacterCardModule {}