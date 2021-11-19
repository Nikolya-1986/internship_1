import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CharacterEditComponent } from "./components/character-edit/character-edit.component";
import { DescriptionComponent } from "./description.component";

@NgModule({
    declarations: [
        DescriptionComponent,
        CharacterEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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