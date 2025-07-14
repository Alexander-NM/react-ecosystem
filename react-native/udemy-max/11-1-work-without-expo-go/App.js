import { StatusBar } from "expo-status-bar"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import * as Location from "expo-location"

export default function App() {
    async function getUserLocationHandler() {
        const permission = await Location.requestForegroundPermissionsAsync()
        if (permission.granted) {
            const location = await Location.getCurrentPositionAsync()
            console.log("Location:", location)
        } else {
            console.log("Permission denied")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Alexander you did it!</Text>
            <Button title="Press me" onPress={getUserLocationHandler} />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
