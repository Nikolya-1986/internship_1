import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserDTO } from "../../interfaces/user-interface";

@Injectable({
    providedIn: 'root'
})
export class AuthServise {

    constructor(
        private router: Router
    ){}

    public sendToken(token: string): void{
        localStorage.setItem("userToken", token);
    }

    public getToken(): string {
        return localStorage.getItem("userToken");
    }

    public get isAuthenticated(): boolean {
        return (localStorage.getItem("userToken") !== null );
    }

    public login(userLogin: UserDTO): boolean {
        console.log("User login:", userLogin);
        this.router.navigate([""]);
        return this.getToken() !== null;
    }

    public logout(): void {
        localStorage.removeItem("userToken");
        this.router.navigate(["/login"]);
    }
}