import { useContext, useState } from "react"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { login } from "../util/auth"
import { Alert } from "react-native"
import { AuthContext } from "../store/auth-context"

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function loginUser({
        email,
        password,
    }: {
        email: string
        password: string
    }) {
        setIsAuthenticating(true)
        try {
            const idToken = await login(email, password)
            authCtx.authenticate(idToken)
        } catch (error) {
            let message = "Login failed!"
            if (error instanceof Error) {
                message = error.message
            }
            // Show an alert or a toast with the error message
            Alert.alert(message)
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging in..." />
    }

    return <AuthContent isLogin onAuthenticate={loginUser} />
}

export default LoginScreen
