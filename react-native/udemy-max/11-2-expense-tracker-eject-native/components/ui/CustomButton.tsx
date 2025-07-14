import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function CustomButton({
    children,
    onPress,
    mode,
    style,
}: {
    children: React.ReactNode
    onPress: () => void
    mode: "flat" | "contained"
    style?: ViewStyle
}) {
    return (
        <View style={style}>
            <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={onPress}
            >
                <View style={[styles.bottom, mode === "flat" && styles.flat]}>
                    <Text
                        style={[
                            styles.buttonText,
                            mode === "flat" && styles.flatText,
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: { backgroundColor: "transparent" },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    },
})
