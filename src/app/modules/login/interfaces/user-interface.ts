export interface UserDTO {
    name: string,
    password: string
}

export interface User extends UserDTO {
    token: string
}