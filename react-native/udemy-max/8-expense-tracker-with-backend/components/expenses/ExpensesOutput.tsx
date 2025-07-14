import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"
import { ExpensesContext } from "../../store/expenses-context"
import { Expense } from "../../data/dummyData"

export default function ExpensesOutput({
    expensesPeriod,
    expenses,
    fallbackText
}: {
    expensesPeriod: string
    expenses: Expense[]
    fallbackText: string
}) {
    const fallbackElement = (
        <Text style={styles.fallbackText}>
            {fallbackText || "No expenses registered for this period."}
        </Text>
    )

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {expenses.length === 0 && fallbackElement}
            <ExpensesList expenses={expenses} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    fallbackText: {
        color: GlobalStyles.colors.primary100,
        fontSize: 16,
        textAlign: "center",
        marginTop: 32,
    },
})
