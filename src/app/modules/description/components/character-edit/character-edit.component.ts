import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    @Output() public savedCharacter = new EventEmitter<void>();

    public formEdit!: FormGroup;
    
    constructor(
        private formBilder: FormBuilder,
    ){}

    public ngOnInit(): void {

        this.formEdit = this.formBilder.group({
            image: [this.characterDetails.image,
                [Validators.required]
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
            // created: [this.characterDetails.created,
            //     [Validators.required]
            // ],
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
            this.savedCharacter.emit();
        }
    }

}