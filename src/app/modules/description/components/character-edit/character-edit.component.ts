import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fromEvent, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";

import { CharacterDTO, Location } from "../../../../interfaces/character-interface";
import { imageValidator } from "../../validators/image-validator";

@Component({
    selector: 'app-character-edit',
    templateUrl: './character-edit.component.html',
    styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit{

    @Input() public characterDetails: CharacterDTO<Location>;
    @Input() public isVisible: boolean;
    @Output() public changeCharacter = new EventEmitter<CharacterDTO<Location>>();
    
    public formEdit: FormGroup;
    public imageError: string;

    constructor(
        private formBilder: FormBuilder,
    ){}

    public ngOnInit(): void {

        this.formEdit = this.formBilder.group({
            image: ["",
                [
                    Validators.required,
                    imageValidator
                ]
            ],
            name: [this.characterDetails.name,
                [Validators.required]
            ],
            status: [this.characterDetails.status,
                [Validators.required]
            ],
            species: [this.characterDetails.species,
                [Validators.required]
            ],
            gender: [this.characterDetails.gender,
                [Validators.required]
            ],
            created: [this.characterDetails.created,
                [Validators.required]
            ],
            originName: [this.characterDetails.origin.name,
                [Validators.required]
            ],
            locationName: [this.characterDetails.location.name,
                [Validators.required]
            ],
            locationType: [this.characterDetails.location.type,
                [Validators.required]
            ],
            locationDimension: [this.characterDetails.location.dimension,
                [Validators.required]
            ]
        }) 
    };

    public editCharacter(): void {
        if(this.formEdit.valid) {
            const id = this.characterDetails.id;
            const editCharacter = this.formEdit.getRawValue();
            const character = {
                // ...this.characterDetails,
                id,
                ...editCharacter,
            };
            this.changeCharacter.emit(character);
        }
    }

    public imageChange(inputEvent: Event): void {
        const base64string$ = this.getBase64fromFile(inputEvent as ProgressEvent<HTMLInputElement>).pipe(take(1));
        base64string$.subscribe(image => {
            const character: CharacterDTO<Location> = {
                ...this.characterDetails,
                image
            };
            this.changeCharacter.emit(character);
        })
    }

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