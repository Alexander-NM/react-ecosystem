import { StyleSheet, Text, StyleProp, TextStyle } from "react-native"
import React from "react"
import Colors from "../../constants/colors"

export default function InstructionText({
    children,
    style,
}: {
    children: React.ReactNode | undefined
    style?: StyleProp<TextStyle> | undefined
}) {
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans",
        color: Colors.accent500,
        fontSize: 24,
    },
})
