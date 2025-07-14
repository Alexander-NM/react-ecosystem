import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"

type AuthContextType = {
    authToken: string | null
    isAuthenticated: boolean
    authenticate: (authToken: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    authToken: null,
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
})

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [authToken, setAuthToken] = useState<string | null>(null)

    function authenticate(authToken: string) {
        setAuthToken(authToken)
        AsyncStorage.setItem("idToken", authToken)
            .catch((error) => {
                console.error("Error storing idToken:", error)
            })
    }

    function logout() {
        setAuthToken(null)
        AsyncStorage.removeItem("idToken")
            .catch((error) => {
                console.error("Error removing idToken:", error)
            })
    }

    const value: AuthContextType = {
        authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
