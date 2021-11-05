import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DescriptionCharacterCardComponent } from "./components/description-character-card.component";

@NgModule({
    declarations: [
        DescriptionCharacterCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "", component: DescriptionCharacterCardComponent
            }
        ])
    ],
    exports: [ 
        RouterModule 
    ]
})
export class DescriptionCharacterCardModule {}