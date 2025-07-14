import { StyleSheet, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/types"
import { GlobalStyles } from "../constants/styles"
import ExpenseForm from "../components/manageExpense/ExpenseForm"

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">
export default function ManageExpense({ route, navigation }: Props) {
    const { expenseId } = route.params || {}
    // This is a common pattern to convert a value to a boolean in JavaScript.
    const isEditing = !!expenseId

    // Using useLayoutEffect to avoid flickering of the header title
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: isEditing ? "Edit Expense" : "Add Expense",
        })
    }, [isEditing, navigation])

    return (
        <View style={styles.container}>
            <ExpenseForm isEditing={isEditing} expenseId={expenseId} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    
})
