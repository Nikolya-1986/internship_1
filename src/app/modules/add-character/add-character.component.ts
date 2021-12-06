import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { fromEvent, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { Router } from "@angular/router";

import { CharacterService } from "src/app/services/character/character.service";
import { CharacterDTO, Episode, Gender, LocationDTO } from "../../interfaces/character-interface";
import AppCharactersState from "../../store/character/character.state";
import { imageValidator } from "../../validators/image-validator";
import * as characterActions from "../../store/character/character.actions";

@Component({
    selector: 'app-add-character',
    templateUrl: './add-character.component.html',
    styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {

    public formAdd: FormGroup;
    public gender: Gender[] = [Gender.Female, Gender.Male];
    public episodes: Episode[];
    private base64Image: string;
    public characterEpisodeIds: number[];

    constructor(
        private formBilder: FormBuilder,
        private store: Store<AppCharactersState>,
        private characterService: CharacterService,
        private router: Router,
    ){}

    public ngOnInit(): void {
        this.formAdd = this.formBilder.group({
            image: ["",
                [
                    Validators.required,
                    imageValidator
                ]
            ],
            name: ["",
                [
                    Validators.required
                ]
            ],
            status: ["",
                [
                    Validators.required,
                ]
            ],
            species: ["",
                [
                    Validators.required,
                ]
            ],
            gender: ["",
                [
                    Validators.required
                ]
            ],
            episode: ["",
                [
                    Validators.required
                ]
            ],
            created: ["",
                [
                    Validators.required
                ]
            ],
            originName: ["",
                [
                    Validators.required
                ]
            ],
            locationName: ["",
                [
                    Validators.required,
                ]
            ],
            locationType: ["",
                [
                Validators.required,
                ]
            ],
            locationDimension: ["",
                [
                    Validators.required,
                ]
            ]
        });

        this.characterService.getEpisodes().subscribe((episodes) => {
            this.episodes = episodes;
        });
    };

    public saveCharacter(): void {
        if(this.formAdd.valid) {
            const newCharacter = this.formAdd.getRawValue();
            const id = Math.floor(Math.random() * 100) + 1;
            const character: CharacterDTO<LocationDTO> = {
                ...newCharacter,
                episode: [newCharacter.episode],
                image: this.base64Image,
                id
            };
            this.store.dispatch(characterActions.createCharacter({character}));
            this.router.navigate(['/'])
        }
    };

    public addImage(inputEvent: Event): void {
        const image = this.getBase64fromFile(inputEvent as ProgressEvent<HTMLInputElement>).pipe(take(1));
        image.subscribe(imageString => this.base64Image = imageString);
    };

    private getBase64fromFile({ target }: { target: HTMLInputElement}): Observable<string> {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);

        return fromEvent(reader, 'load')
            .pipe(
                filter(() => target.files && target.files.length > 0),
                map(() => reader.result as string)
            );
    }
}