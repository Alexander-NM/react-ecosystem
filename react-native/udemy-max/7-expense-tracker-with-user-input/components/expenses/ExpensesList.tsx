import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import { Expense } from "../../data/dummyData"
import ExpenseItem from "./ExpenseItem"

function renderExpenseItem({ item: expense }: { item: Expense }) {
    return <ExpenseItem {...expense}/>
}

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    )
}

const styles = StyleSheet.create({})
