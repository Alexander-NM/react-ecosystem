import { StyleSheet, Text, StatusBar, Platform, Button } from "react-native"
import CategoriesScreen from "./screens/CategoriesScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import { setBackgroundColorAsync } from "expo-system-ui"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MealsOverviewScreen from "./screens/MealsOverviewScreen"
import { RootStackParamList } from "./navigation/types"
import MealDetailsScreen from "./screens/MealDetailsScreen"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerParamList } from "./navigation/types"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import FavoritesContextProvider from "./store/context/favorites-context"
import { Provider } from "react-redux"
import { store } from "./store/redux/store"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerParamList>()

// Set background for android and ios
setBackgroundColorAsync("#372d2b")

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#933600FF" },
                headerTintColor: "white",
                drawerContentStyle: { backgroundColor: "#372d2b" },
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "white",
                drawerActiveBackgroundColor: "#533E31FF",
                sceneStyle: { backgroundColor: "#533E31FF" },
            }}
        >
            <Drawer.Screen
                name="MealsCategories"
                component={CategoriesScreen}
                options={{
                    title: "All Categories",
                    drawerLabel: "Categories",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="star" color={color} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            {/* <FavoritesContextProvider> */}
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        id={undefined}
                        screenOptions={{
                            headerStyle: { backgroundColor: "#933600FF" },
                            headerTintColor: "white",
                            contentStyle: { backgroundColor: "#533E31FF" },
                        }}
                    >
                        <Stack.Screen
                            name="DrawerScreen"
                            component={DrawerNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="MealsOverview"
                            component={MealsOverviewScreen}
                        />
                        <Stack.Screen
                            name="MealDetails"
                            component={MealDetailsScreen}
                            options={{
                                headerRight: () => <Button title="Tap me" />,
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
            {/* </FavoritesContextProvider> */}
        </>
    )
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        paddingTop: Platform.select({ android: 60 }),
    },
})
