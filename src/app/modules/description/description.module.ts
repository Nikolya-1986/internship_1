import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CharacterEditComponent } from "./components/character-edit/character-edit.component";
import { DescriptionComponent } from "./description.component";
import { FormatDataPipe } from "./pipes/format-data.pipe";

@NgModule({
    declarations: [
        DescriptionComponent,
        CharacterEditComponent,
        FormatDataPipe
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