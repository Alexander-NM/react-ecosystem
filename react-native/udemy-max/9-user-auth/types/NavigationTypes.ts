export type AuthStack = {
    Login: undefined
    Signup: undefined
}

export type AuthenticatedStack = {
    Welcome: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AuthStack, AuthenticatedStack {}
    }
}
