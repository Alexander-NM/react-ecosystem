import axios from "axios"
import { Expense } from "../data/dummyData"

const BACKEND_URL =
    "https://react-n-expense-tracker-app-default-rtdb.firebaseio.com"

export async function storeExpense(expenseData: Expense) {
    const response = await axios.post(
        BACKEND_URL + "/expenses.json",
        expenseData
    )
    return response.data.name // Returns the ID of the newly created expense
}

export function storeWithFetch(expenseData: Expense) {
    fetch(
        BACKEND_URL + "/expenses.json",
        {
            method: "POST",
            body: JSON.stringify(expenseData),
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

export async function getExpenses() {
    const response = await axios.get(BACKEND_URL + "/expenses.json")

    const expenses = []
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObj)
    }
    return expenses
}

export async function deleteExpense(id: string) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

export async function updateExpense({id, ...expenseData}: Expense) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}
