import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import RootNativeStack from "./navigation/RootNativeStack"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import { dbInit } from "./util/database"

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false)

    useEffect(() => {
        dbInit()
            .then(() => {
                setAppIsReady(true)
                SplashScreen.hideAsync()
            })
            .catch((error) => {
                console.error("Error initializing database:", error)
            })
    }, [])

    if (!appIsReady) {
        return null
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <RootNativeStack />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
