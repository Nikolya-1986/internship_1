import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DescriptionCharacterCardComponent } from "../description-character-card/components/description-character-card.component";
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
            },
            {
                path: ":id", component: DescriptionCharacterCardComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HomeCharacterCardModule {}