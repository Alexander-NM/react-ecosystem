import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Colors } from "../constants/styles"
import { AuthenticatedStack as AuthenticatedStackParamList } from "../types/NavigationTypes"
import WelcomeScreen from "../screens/WelcomeScreen"
import IconButton from "../components/ui/IconButton"
import { useContext } from "react"
import { AuthContext } from "../store/auth-context"

const Stack = createNativeStackNavigator<
    AuthenticatedStackParamList,
    "AuthenticatedStack"
>()

export default function AuthenticatedStack() {
    const authCtx = useContext(AuthContext)

    async function handleLogout() {
        authCtx.logout()
    }

    return (
        <Stack.Navigator
            id="AuthenticatedStack"
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    headerRight: ({ tintColor }) => (
                        <IconButton
                            color={tintColor}
                            size={24}
                            icon="exit"
                            onPress={handleLogout}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}
