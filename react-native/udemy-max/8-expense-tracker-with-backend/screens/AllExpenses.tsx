import { StyleSheet, Text, View } from "react-native"
import React from "react"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"

export default function AllExpenses() {
    const expensesContext = React.useContext(ExpensesContext)

   if (expensesContext.isFetching) {
        return <LoadingOverlay />
    }

    if (expensesContext.error) {
        return <ErrorOverlay errorMessage={expensesContext.error} />
    }
        
    return (
        <ExpensesOutput
            expensesPeriod="All"
            expenses={expensesContext.expenses}
            fallbackText="No expenses registered."
        />
    )
}

const styles = StyleSheet.create({})
