import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

import { CharacterDTO, LocationDTO } from "src/app/interfaces/character-interface";
import { ModalComponent } from "../modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    
    private componentRef: ComponentRef<ModalComponent>;
    private subject$: Subject<string>;

    constructor(
        private resolver: ComponentFactoryResolver,
    ){}

    openModal(viewContainerRef: ViewContainerRef, modalTitle: string, modalBody: string, character: CharacterDTO<LocationDTO>) {
        const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
        this.componentRef = viewContainerRef.createComponent(modalFactory);
        this.componentRef.instance.title = modalTitle;
        this.componentRef.instance.body = modalBody;
        this.componentRef.instance.name = character.name;
        this.componentRef.instance.cancelEvent.subscribe(() => this.closeModal());
        this.componentRef.instance.confirmEvent.subscribe(() => this.confirm(character.id));
        this.subject$ = new Subject<string>();
        return this.subject$.asObservable();
    }

    closeModal() {
        this.subject$.complete();
        this.componentRef.destroy();
    }
    
    confirm(characterId: number) {
        this.subject$.next('Confirmed character delete');
        this.closeModal();
        this.subject$.unsubscribe();
    }
}