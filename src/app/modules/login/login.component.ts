import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthServise } from "./services/auth/auth.servise";
import { passwordValidator } from "./validators/password-validator";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public formLogin!: FormGroup;
    public isShowPassword: boolean;
    public isShowEye: boolean;

    constructor(
        private formBilder: FormBuilder,
        private authServise: AuthServise
    ){}

    public ngOnInit(): void {
        this.formLogin = this.formBilder.group({
            name: ["",
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(10)
                ]
            ],
            password: ["",
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    passwordValidator
                ]
            ]
        })
    };

    showPassword() {
        this.isShowPassword = !this.isShowPassword;
        this.isShowEye = !this.isShowEye;
    }

    login(){
        if(this.formLogin.invalid) {
            return
        }

        const userLogin = this.formLogin.getRawValue();
        this.authServise.isAuthenticated();
    }
}