import { useContext, useState } from "react"
import AuthContent from "../components/Auth/AuthContent"
import { createUser } from "../util/auth"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { Alert } from "react-native"
import { AuthContext } from "../store/auth-context"

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const authCtx = useContext(AuthContext)

    async function signUpUser({
        email,
        password,
    }: {
        email: string
        password: string
    }) {
        try {
            setIsAuthenticating(true)
            const idToken = await createUser(email, password)
            authCtx.authenticate(idToken)
        } catch (error) {
            let message = "User creation failed!"
            if (error instanceof Error) {
                message = error.message
            }
            Alert.alert(message)
            console.error("Signup error:", error)
            setIsAuthenticating(false)
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />
    }

    return <AuthContent isLogin={false} onAuthenticate={signUpUser} />
}

export default SignupScreen
