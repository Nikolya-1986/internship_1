import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl) {
    
    if(control && (control.value !== undefined || control.value !== null)){

        const passwordPatern = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.-_])[A-Za-z\d$@$!%*?&.-_]");
        
        if(!passwordPatern.test(control.value)){
            return {
                passwordError: true
            }
        }
    }
    return null
}