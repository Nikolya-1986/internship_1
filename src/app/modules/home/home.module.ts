import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { CharacterListComponent } from "./components/character-list/character-list.component";
import { CharacterItemComponent } from "./components/character-item/character-item.component";
import { EpisodeListComponent } from "./components/episode-list/episode-list.component";
import { EpisodeItemComponent } from "./components/episode-item/episode-item.component";
import { CharacterFilterComponent } from "./components/character-filter/character-filter.component";
import { ModalComponent } from "./components/modal/modal.component";

import { ChangeTextPipe } from "./pipe/change-text.pipe";
import { FilterGenderCharacterPipe } from "./pipe/filter-gender-character.pipe";
import { SearchCharacterNamePipe } from "./pipe/search-name-character.pipe";
import { FilterEpisodeCharacterPipe } from "./pipe/filter-episode-character.pipe";
import { FilterNameCharacterPipe } from "./pipe/filter-name-character.pipe";

@NgModule({
    declarations: [
        HomeComponent,
        CharacterListComponent,
        CharacterItemComponent,
        EpisodeListComponent,
        EpisodeItemComponent,
        CharacterFilterComponent,
        ModalComponent,
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
                path: "", component: HomeComponent
            }
        ])
    ],
    exports: [
        RouterModule,
        ChangeTextPipe
    ]
})
export class HomeModule {}