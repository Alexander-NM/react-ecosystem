import { StyleSheet, Pressable } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

// Solution #1
// type MaterialIconName1 = keyof typeof Ionicons.glyphMap

// Solution #2
type MaterialIconName = React.ComponentProps<typeof Ionicons>['name'];

export default function IconButton({
    onPress,
    name,
    size,
}: {
    onPress: () => void
    name: MaterialIconName
    size: number
}) {
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={onPress}
        >
            <Ionicons name={name} size={size} color="white" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.3,
    },
})
