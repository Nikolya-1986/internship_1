import { Injectable } from "@angular/core";
import { UserDTO } from "src/app/modules/login/interfaces/user-interface";

@Injectable({
    providedIn: 'root'
})
export class AuthServise {

    // private token = 'token-for-user';

    // login(userLogin): void {
    //     if(userLogin) {
    //         localStorage.setItem('token', this.token)
    //     }
    // }

    private token: boolean;

    public isAuthenticated() {
        const userToken = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.token)
                }, 0)
            }
        )
        return userToken;
    }

    public login() {
        this.token = true;
    }

    public logout() {
        this.token = false;
    }
}