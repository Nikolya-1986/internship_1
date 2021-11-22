import { AbstractControl } from "@angular/forms";

export function imageValidator(control: AbstractControl) {

    if(!control.value) {
        return {
            noFile: true,
        }
    } else if (control.value[0].size > 1000000 ) {
        return {
            fileToBig: true,
        }
    }
    return null
}