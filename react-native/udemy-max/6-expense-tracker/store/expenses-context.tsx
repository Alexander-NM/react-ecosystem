import { createContext, ReactNode, useReducer } from "react"
import { Expense } from "../data/dummyData"
import { DUMMY_EXPENSES } from "../data/dummyData"

// Types
type actionTypes = "ADD_EXPENSE" | "UPDATE_EXPENSE" | "DELETE_EXPENSE"
type ExpensesContextType = {
    expenses: Expense[]
    addExpense: (expense: Expense) => void
    updateExpense: ({ id, expense }: { id: string; expense: Expense }) => void
    deleteExpense: (id: string) => void
}

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    addExpense: () => {},
    updateExpense: () => {},
    deleteExpense: () => {},
})


function expensesReducer(
    state: Expense[],
    action: { type: actionTypes; payload: { expense?: Expense; id?: string } }
): Expense[] {
    switch (action.type) {
        case "ADD_EXPENSE":
            if (!action.payload.expense) {
                throw new Error("Expense is required for ADD_EXPENSE action")
            }
            // Generate a unique ID for the new expense
            const id = new Date().toISOString() + Math.random().toString()
            return [...state, { ...action.payload.expense, id }]
        case "UPDATE_EXPENSE":
            if (!action.payload.expense || !action.payload.id) {
                throw new Error(
                    "Expense and id are required for UPDATE_EXPENSE action"
                )
            }
            return state.map((expense) =>
                expense.id === action.payload.id
                    ? action.payload.expense!
                    : expense
            )
        case "DELETE_EXPENSE":
            return state.filter((expense) => expense.id !== action.payload.id)
        default:
            return state
    }
}

export default function ExpensesContextProvider({
    children,
}: {
    children: ReactNode
}) {
    // const [expenses, setExpenses] = useState<Expense[]>([...DUMMY_EXPENSES])

    // Two parameters are required for useReducer: a reducer function and an initial state.
    const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    function addExpense(expense: Expense) {
        dispatch({
            type: "ADD_EXPENSE",
            payload: { expense },
        })
    }

    function updateExpense({ id, expense }: { id: string; expense: Expense }) {
        // setExpenses((prevExpenses) =>
        //     prevExpenses.map((exp) => (exp.id === id ? expense : exp))
        // )
        dispatch({
            type: "UPDATE_EXPENSE",
            payload: { expense, id },
        })
    }

    function deleteExpense(id: string) {
        // setExpenses((prevExpenses) =>
        //     prevExpenses.filter((exp) => exp.id !== id)
        // )
        dispatch({
            type: "DELETE_EXPENSE",
            payload: { id },
        })
    }

    const value = {
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}
