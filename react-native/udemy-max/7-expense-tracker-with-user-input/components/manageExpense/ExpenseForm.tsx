import { StyleSheet, Text, View, Alert } from "react-native"
import React from "react"
import Input from "../ui/Input"
import { GlobalStyles } from "../../constants/styles"
import { ExpensesContext } from "../../store/expenses-context"
import CustomButton from "../ui/CustomButton"
import { useNavigation } from "@react-navigation/native"
import IconButton from "../ui/IconButton"
import { Expense } from "../../data/dummyData"

type InputState = {
    amount: { value: string; isValid: boolean }
    date: { value: string; isValid: boolean }
    description: { value: string; isValid: boolean }
}

export default function ExpenseForm({
    isEditing,
    expenseId,
}: {
    isEditing: boolean
    expenseId?: string
}) {
    const navigation = useNavigation()
    const expensesContext = React.useContext(ExpensesContext)

    function setInitialValue() {
        let initialInputValues = {
            amount: { value: "", isValid: false },
            date: { value: "", isValid: false },
            description: { value: "", isValid: false },
        }

        if (isEditing) {
            const expenseData = expensesContext.getExpense(expenseId as string)
            if (expenseData) {
                initialInputValues = {
                    amount: {
                        value: expenseData.amount.toString(),
                        isValid: true,
                    },
                    date: {
                        value: expenseData.date.toISOString().slice(0, 10),
                        isValid: true,
                    },
                    description: {
                        value: expenseData.description,
                        isValid: true,
                    },
                }
            }
        }
        return initialInputValues
    }

    const [inputValues, setInputValues] = React.useState<InputState>(() =>
        setInitialValue()
    )

    function inputChangedHandler(
        inputIdentifier: keyof InputState,
        enteredText: string
    ) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputIdentifier]: { value: enteredText, isValid: true },
        }))
    }

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
        const expense = getExpenseObject()
        if (!expense) {
            return
        }

        expensesContext.addExpense(expense)
        navigation.goBack()
    }

    function updateHandler() {
        if (!expenseId) {
            Alert.alert("No expense ID provided for update.")
            return
        }

        const expense = getExpenseObject()
        if (!expense) {
            return
        }

        expensesContext.updateExpense({
            id: expenseId,
            expense,
        })
        navigation.goBack()
    }

    function getExpenseObject() {
        const isDateFormatValid: boolean = dateFormatCheck()

        const expense: Expense = {
            description: inputValues.description.value,
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            id: expenseId as string, // Ensure the ID remains the same for updates
        }

        const { isAmountValid, isDateValid, isDescriptionValid } =
            inputValidation(expense, isDateFormatValid)

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            return null
        }

        return expense
    }

    function dateFormatCheck(): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if (!regex.test(inputValues.date.value)) {
            // Alert.alert("Date is not valid. It must be in format YYYY-MM-DD")
            setInputValues((prevValues) => ({
                ...prevValues,
                date: { value: prevValues.date.value, isValid: false },
            }))
            return false
        }
        return true
    }

    function inputValidation(expense: Expense, isDateFormatValid = true) {
        const inputCheck = {
            isAmountValid: inputValues.amount.isValid,
            isDateValid: isDateFormatValid,
            isDescriptionValid: inputValues.description.isValid,
        }

        if (isNaN(expense.amount) || expense.amount <= 0) {
            // Alert.alert("An amount must be a number greater than zero")
            inputCheck.isAmountValid = false
        }

        if (expense.date.toString() === "Invalid date") {
            // Alert.alert("Date must be entered in YYYY-MM-DD format")
            inputCheck.isDateValid = false
        }

        if (expense.description.trim().length === 0) {
            // Alert.alert("Please add description")
            inputCheck.isDescriptionValid = false
        }

        setInputValues((prevValues) => ({
            ...prevValues,
            amount: {
                value: prevValues.amount.value,
                isValid: inputCheck.isAmountValid,
            },
            date: {
                value: prevValues.date.value,
                isValid: inputCheck.isDateValid,
            },
            description: {
                value: prevValues.description.value,
                isValid: inputCheck.isDescriptionValid,
            },
        }))

        return inputCheck
    }

    const isFormValid =
        inputValues.amount.isValid &&
        inputValues.date.isValid &&
        inputValues.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.textTitle}>Expense information</Text>
            <View style={styles.amountDateContainer}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputValues.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(null, "amount"),
                        value: inputValues.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputValues.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(null, "date"),
                        value: inputValues.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputValues.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(null, "description"),
                    value: inputValues.description.value,
                }}
            />
            {!isFormValid && (
                <Text style={styles.inputError}>
                    Please check your input values.
                </Text>
            )}
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
    form: { marginTop: 20 },
    amountDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    textTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary50,
        marginBottom: 16,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    button: { minWidth: 120, marginHorizontal: 8 },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
    inputError: {
        color: GlobalStyles.colors.error500,
        marginTop: 4,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        padding: 8,
    },
})
