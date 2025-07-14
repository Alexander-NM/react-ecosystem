import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Expense } from "../../data/dummyData"
import { GlobalStyles } from "../../constants/styles"

export default function ExpensesSummary({
    periodName,
    expenses,
}: {
    periodName: string
    // Array <expense> | expense[]
    expenses: Array<Expense>
}) {
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.amount}>${totalExpenses.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400,
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,
    },
})
