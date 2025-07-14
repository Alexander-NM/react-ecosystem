import { View, Text, Pressable, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

function PrimaryButton({
    children,
    onPress,
}: {
    children: any
    onPress?: () => void
}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                onPress={onPress}
                android_ripple={{
                    color: Colors.primary600,
                }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        borderRadius: 30,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: Colors.accent300,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: Colors.primary500,
        fontWeight: '600',
        fontSize: 18,
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75,
    },
})
