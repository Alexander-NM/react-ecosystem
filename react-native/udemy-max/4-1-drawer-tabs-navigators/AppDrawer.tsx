import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import UserScreen from "./screens/UserScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { RootStackParamList } from "./navigation/types"

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#3AAB7AFF" },
                    headerTintColor: "white",
                    drawerActiveBackgroundColor: "#4EA780FF",
                    drawerActiveTintColor: "black",
                    drawerStyle: { backgroundColor: "#EFEFEFFF" },
                }}
                initialRouteName="welcome"
            >
                <Drawer.Screen
                    name="welcome"
                    component={WelcomeScreen}
                    options={{
                        drawerLabel: "Welcome Screen",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    options={{
                        drawerLabel: "User Screen",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={size} />
                        ),
                    }}
                    name="user"
                    component={UserScreen}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
