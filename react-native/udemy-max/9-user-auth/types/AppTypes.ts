export type Credentials = {
    email: string,
    confirmEmail?: string,
    password: string,
    confirmPassword?: string
}

export type CredentialsInvalidStates = {
    email: boolean,
    password: boolean,
    confirmEmail: boolean,
    confirmPassword: boolean,
}

export type InputTypes = 
    | "email"
    | "confirmEmail"
    | "password"
    | "confirmPassword"