import { Pressable, StyleSheet, Text, ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { ColorsPallete } from "../../constants/colors"

type IconType = React.ComponentProps<typeof Ionicons>["name"]

export default function OutlinedButton({
    icon,
    onPress,
    children,
    style
}: {
    icon: IconType
    onPress: () => void
    children: React.ReactNode
    style?: ViewStyle
}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
        >
            <Ionicons style={styles.icon} name={icon} size={18} color={ColorsPallete.primary500} />
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
        borderWidth: 1,
        borderColor: ColorsPallete.primary500,
        borderRadius: 6,
    },
    pressed: {
        opacity: 0.5,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: ColorsPallete.primary500,
    },  
})
