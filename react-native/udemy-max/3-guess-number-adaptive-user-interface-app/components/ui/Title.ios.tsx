import { StyleSheet, Text, Platform } from "react-native"
import React from "react"

export default function Title({ children }) {
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        // borderWidth: Platform.OS === "android" ? 2 : 0,
        // borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderWidth: 0,
        borderColor: "white",
        padding: 12,
        marginVertical: 20,
        marginHorizontal: 10,
        maxWidth: "80%",
    },
})
