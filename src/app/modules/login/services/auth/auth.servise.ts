import { Injectable } from "@angular/core";

import { UserDTO } from "../../interfaces/user-interface";

@Injectable({
    providedIn: 'root'
})
export class AuthServise {

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
        return this.getToken() !== null;
    }

    public logout(): void {
        localStorage.removeItem("userToken");
    }
}