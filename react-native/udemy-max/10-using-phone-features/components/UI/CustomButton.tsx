import { Pressable, StyleSheet, Text, ViewStyle } from "react-native"
import React from "react"
import { ColorsPallete } from "../../constants/colors"

export default function CustomButton({
    onPress,
    children,
    style
}: {
    onPress: () => void
    children: React.ReactNode
    style?: ViewStyle
}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ColorsPallete.primary800,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.15,
        elevation: 2,
        borderRadius: 6,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        color: ColorsPallete.primary50,
        textAlign: "center",
        fontSize: 16,
    },  
})
