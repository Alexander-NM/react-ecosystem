import { StatusBar } from "expo-status-bar"
import AuthContextProvider from "./store/auth-context"
import { RootNavigation } from "./navigation/RootNavigation"

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <RootNavigation />
            </AuthContextProvider>
        </>
    )
}
