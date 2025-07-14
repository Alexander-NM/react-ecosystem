import { StyleSheet, Text, TextInput, View, TextInputProps, ViewStyle } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function Input({
    label,
    textInputConfig,
    style,
    invalid
}: {
    label: string
    textInputConfig?: TextInputProps
    style?: ViewStyle
    invalid?: boolean
}) {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    textInputConfig?.multiline && styles.inputMultiline,
                    invalid && styles.invalidInput,
                ]}
                {...textInputConfig}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
        marginHorizontal: 4,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary200,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
        borderColor: GlobalStyles.colors.error500,
        borderWidth: 1,
    },
})
