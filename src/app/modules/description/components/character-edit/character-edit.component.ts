import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fromEvent, Observable } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";
import { CharacterDTO, Location } from "src/app/interfaces/character-interface";

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
    public isImageError: boolean;
    
    constructor(
        private formBilder: FormBuilder,
    ){}

    public ngOnInit(): void {

        this.formEdit = this.formBilder.group({

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
                ...this.characterDetails,
                id,
                ...editCharacter,
            };
            this.changeCharacter.emit(character);
        }
    }

    public imageChange(newimage): void {
        const base64string$ = this.getBase64fromFile(newimage).pipe(take(1));
        base64string$.subscribe(image => {
            const character: CharacterDTO<Location> = {
                ...this.characterDetails,
                image
            };
            this.changeCharacter.emit(character);
        })
    }

    private getBase64fromFile(image: ProgressEvent<HTMLInputElement>): Observable<string> {
        const reader = new FileReader();
        reader.readAsDataURL(image.target.files[0]);

        return fromEvent(reader, 'load')
            .pipe(
                tap((file: ProgressEvent<HTMLInputElement>) => {
                    if(file.loaded > 1000000) {
                        this.isImageError = false;
                        console.log("Error:", file.loaded);
                    } else {
                        this.isImageError = true;
                    }
                }),
                filter((file) => image.target.files && image.target.files.length > 0 && file.loaded < 1000000),
                map(() => reader.result as string)
            );
            
    }
}