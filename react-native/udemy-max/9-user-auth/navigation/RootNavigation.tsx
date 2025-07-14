import { NavigationContainer } from "@react-navigation/native"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../store/auth-context"
import AuthenticatedStack from "./AuthenticatedStack"
import AuthStack from "./AuthStack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, StyleSheet } from "react-native"
import * as SplashScreen from "expo-splash-screen"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export function RootNavigation() {
    const authCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    console.log("RootNavigation isLoading:", isLoading)
    useEffect(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem("idToken")
                if (value !== null) {
                    authCtx.authenticate(value)
                }
            } catch (e) {
                console.error("Error reading value:", e)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    const onLayoutRootView = useCallback(() => {
        if (!isLoading) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            SplashScreen.hide()
        }
    }, [isLoading])

    if (isLoading) {
        return null
    }
    console.log("I'm here in RootNavigation");
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
                {authCtx.isAuthenticated ? (
                    <AuthenticatedStack />
                ) : (
                    <AuthStack />
                )}
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
