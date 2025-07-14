import { NavigationContainer } from "@react-navigation/native"
import UserScreen from "./screens/UserScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import React from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import { RootStackParamList } from "./navigation/types"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#3AAB7AFF" },
                    headerTintColor: "white",
                    tabBarActiveTintColor: "#4EA780FF",
                }}
                initialRouteName="welcome"
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" color={color} size={size} />
                        ),
                        tabBarLabel: "Welcome Screen",
                    }}
                    name="welcome"
                    component={WelcomeScreen}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" color={color} size={size} />
                        ),
                        tabBarLabel: "User Screen",
                    }}
                    name="user"
                    component={UserScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
