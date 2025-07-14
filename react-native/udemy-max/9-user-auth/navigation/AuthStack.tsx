import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Colors } from "../constants/styles"
import { AuthStack as AuthStackParamList } from "../types/NavigationTypes"

import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"

const Stack = createNativeStackNavigator<AuthStackParamList, "AuthStack">()

export default function AuthStack() {
    return (
        <Stack.Navigator
            id="AuthStack"
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}
