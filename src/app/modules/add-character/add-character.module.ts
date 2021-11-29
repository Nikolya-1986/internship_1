import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddCharacterRoutingModule } from "./add-character-routing.module";
import { AddCharacterComponent } from "./add-character.component";

@NgModule({
    declarations: [
        AddCharacterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AddCharacterRoutingModule
    ],
    exports: []
})
export class AddCharacterModule {}