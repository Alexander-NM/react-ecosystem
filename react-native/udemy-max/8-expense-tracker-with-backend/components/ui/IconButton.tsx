import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

type MaterialIconName = React.ComponentProps<typeof Ionicons>["name"]
export default function IconButton({
    icon,
    size,
    color,
    onPress,
}: {
    icon: MaterialIconName
    size: number
    color: string | undefined
    onPress: () => void
}) {
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={onPress}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        borderRadius: 24,
        marginRight: 6,
    },
    pressed: {
        opacity: 0.5,
    },
})
