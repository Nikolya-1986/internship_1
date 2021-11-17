import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
        private authServise: AuthServise,
        private router: Router
    ){}

    public ngOnInit(): void {
        this.formLogin = this.formBilder.group({
            name: ["",
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(10),
                ]
            ],
            password: ["",
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                    passwordValidator,
                ]
            ]
        })
    };
    
    public showPassword(): void {
        this.isShowPassword = !this.isShowPassword;
        this.isShowEye = !this.isShowEye;
    }

    public login(): void {
        if(this.formLogin.valid) {
            const userLogin = this.formLogin.getRawValue();
            this.authServise.sendToken(String(Math.floor(Math.random() * 100) + 1));
            this.authServise.login(userLogin);
            this.router.navigate([""]);
        }
    }
}