import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { DescriptionCharacterCardComponent } from "../description-character-card/components/description-character-card.component";
import { CharacterCardComponent } from "./components/character-card/character-card.component";
import { CharacterListComponent } from "./components/character-list/character-list.component";
import { CharacterItemComponent } from "./components/character-item/character-item.component";
import { EpisodeListComponent } from "./components/episode-list/episode-list.component";
import { EpisodeItemComponent } from "./components/episode-item/episode-item.component";
import { CharacterFilterComponent } from "./components/character-filter/character-filter.component";

import { ChangeTextPipe } from "./pipe/change-text.pipe";
import { FilterGenderCharacterPipe } from "./pipe/filter-gender-character.pipe";
import { SearchCharacterNamePipe } from "./pipe/search-name-character.pipe";
import { FilterEpisodeCharacterPipe } from "./pipe/filter-episode-character.pipe";
import { FilterNameCharacterPipe } from "./pipe/filter-name-character.pipe";


@NgModule({
    declarations: [
        CharacterCardComponent,
        CharacterListComponent,
        CharacterItemComponent,
        EpisodeListComponent,
        EpisodeItemComponent,
        CharacterFilterComponent,
        FilterGenderCharacterPipe,
        SearchCharacterNamePipe,
        FilterEpisodeCharacterPipe,
        FilterNameCharacterPipe,
        ChangeTextPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "", component: CharacterCardComponent
            },
            {
                path: ":id", component: DescriptionCharacterCardComponent
            }
        ])
    ],
    exports: [
        RouterModule,
    ]
})
export class CharacterCardModule {}