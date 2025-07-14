import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

export default function RecentExpenses() {
    const expensesContext = React.useContext(ExpensesContext)

    const recentExpenses = expensesContext.expenses.filter(expense => {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        return expense.date >= sevenDaysAgo
    })

    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallbackText="No expenses registered for the last 7 days."
        />
    )
}

const styles = StyleSheet.create({})
