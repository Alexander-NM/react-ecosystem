import { Pressable, StyleSheet, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import React from "react"

type IconType = React.ComponentProps<typeof Ionicons>["name"]

export default function IconButton({
    icon,
    color,
    size,
    onPress,
}: {
    icon: IconType
    color: string | undefined
    size: number
    onPress: () => void
}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
    },
    pressed: {
        opacity: 0.5,
    },
})
