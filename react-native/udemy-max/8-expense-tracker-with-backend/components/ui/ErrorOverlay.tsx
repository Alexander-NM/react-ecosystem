import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"
import CustomButton from "./CustomButton"
import { ExpensesContext } from "../../store/expenses-context"

export default function ErrorOverlay({
    errorMessage,
}: {
    errorMessage: string
}) {
    const expensesContext = React.useContext(ExpensesContext)

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{errorMessage}</Text>
            <CustomButton
                style={styles.button}
                onPress={expensesContext.setError.bind(null, null)}
                mode="contained"
            >
                Ok
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        marginTop: 14,
        width: 180,
    },
})
