import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DescriptionComponent } from "./description.component";

@NgModule({
    declarations: [
        DescriptionComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "", component: DescriptionComponent
            }
        ])
    ],
    exports: [ 
        RouterModule 
    ]
})
export class DescriptionCharacterCardModule {}