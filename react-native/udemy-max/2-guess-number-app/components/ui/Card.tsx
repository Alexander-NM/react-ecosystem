import { StyleSheet, Text, View } from "react-native"
import React from "react"

export default function Card({ children }) {
    return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
    card: {
        marginTop: 36,
        padding: 16,
        backgroundColor: "#72063CAE",
        marginHorizontal: 24,
        borderRadius: 8,
        borderColor: "#72063c",
        borderWidth: 2,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
        alignItems: "center",
    },
})
