import { StyleSheet, Text, View } from "react-native"
import CustomButton from "../components/ui/CustomButton"
import React, { useLayoutEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/types"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"
import expensesContext, { ExpensesContext } from "../store/expenses-context"

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">
export default function ManageExpense({ route, navigation }: Props) {
    const { expenseId } = route.params || {}
    // This is a common pattern to convert a value to a boolean in JavaScript.
    const isEditing = !!expenseId
    const expensesContext = React.useContext(ExpensesContext)

    // Using useLayoutEffect to avoid flickering of the header title
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: isEditing ? "Edit Expense" : "Add Expense",
        })
    }, [isEditing, navigation])

    function deleteExpenseHandler() {
        if (!expenseId) {
            console.warn("No expense ID provided for deletion.")
            return
        }
        // Call the deleteExpense function from the context
        expensesContext.deleteExpense(expenseId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function addHandler() {
        expensesContext.addExpense({
            description: "New Expense",
            amount: 35,
            date: new Date(),
            id: Math.random().toString() + Date.now().toString(),
        })
        navigation.goBack()
    }

    function updateHandler() {
        if (!expenseId) {
            console.warn("No expense ID provided for update.")
            return
        }
        expensesContext.updateExpense({
            id: expenseId,
            expense: {
                description: "Updated Expense",
                amount: 50,
                date: new Date(),
                id: expenseId, // Ensure the ID remains the same for updates
            },
        })
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomButton
                    mode="flat"
                    onPress={cancelHandler}
                    style={styles.button}
                >
                    Cancel
                </CustomButton>
                <CustomButton
                    mode="contained"
                    onPress={isEditing ? updateHandler : addHandler}
                    style={styles.button}
                >
                    {isEditing ? "Update" : "Add"}
                </CustomButton>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler}
                        size={24}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: { minWidth: 120, marginHorizontal: 8 },
})
