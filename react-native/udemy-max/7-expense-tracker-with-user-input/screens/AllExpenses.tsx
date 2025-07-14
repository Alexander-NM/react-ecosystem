import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

export default function AllExpenses() {
    const expensesContext = React.useContext(ExpensesContext)
    return (
        <ExpensesOutput
            expensesPeriod="All"
            expenses={expensesContext.expenses}
            fallbackText="No expenses registered."
        />
    )
}

const styles = StyleSheet.create({})
