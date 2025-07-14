import { StyleSheet, Text, View } from "react-native"
import React, { use, useEffect } from "react"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"

export default function RecentExpenses() {
    const expensesContext = React.useContext(ExpensesContext)

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        return expense.date >= sevenDaysAgo
    })

    if (expensesContext.isFetching) {
        return <LoadingOverlay />
    }

    if (expensesContext.error) {
        return <ErrorOverlay errorMessage={expensesContext.error} />
    }

    return (
        <ExpensesOutput
            expensesPeriod="Last 7 days"
            expenses={recentExpenses}
            fallbackText="No expenses registered for the last 7 days."
        />
    )
}

const styles = StyleSheet.create({})
