import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DescriptionCharacterCardComponent } from "../description-character-card/components/description-character-card.component";
import { PageharacterCardComponent } from "./components/page-character-cards/page-character-card.component";
import { ItemCharacterCardsComponent } from "./components/item-character-cards/item-character-cards.component";
import { ListCharacterCartsComponent } from "./components/list-character-cards/list-character-cards.component";
import { FilterCharacterCardPipe } from "./pipe/filter-character-card.pipe";

@NgModule({
    declarations: [
        PageharacterCardComponent,
        ListCharacterCartsComponent,
        ItemCharacterCardsComponent,
        FilterCharacterCardPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "", component: PageharacterCardComponent
            },
            {
                path: ":id", component: DescriptionCharacterCardComponent
            }
        ])
    ],
    exports: [
        RouterModule,
        FilterCharacterCardPipe,
    ]
})
export class HomeCharacterCardModule {}