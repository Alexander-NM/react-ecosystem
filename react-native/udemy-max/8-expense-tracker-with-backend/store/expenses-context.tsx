import {
    createContext,
    ReactNode,
    use,
    useEffect,
    useReducer,
    useState,
} from "react"
import { Expense } from "../data/dummyData"
import { getExpenses } from "../util/http"

// Types
type actionTypes =
    | "ADD_EXPENSE"
    | "UPDATE_EXPENSE"
    | "DELETE_EXPENSE"
    | "INITIALIZE_EXPENSES"

type ExpensesContextType = {
    expenses: Expense[]
    isFetching: boolean
    error: string | null
    setError: (error: string | null) => void
    addExpense: (expense: Expense) => void
    updateExpense: ({ id, expense }: { id: string; expense: Expense }) => void
    deleteExpense: (id: string) => void
    getExpense: (id: string) => void | Expense | undefined
}

export const ExpensesContext = createContext<ExpensesContextType>({
    expenses: [],
    isFetching: true,
    error: null,
    setError: () => {},
    addExpense: () => {},
    updateExpense: () => {},
    deleteExpense: () => {},
    getExpense: () => {},
})

function expensesReducer(
    state: Expense[],
    action: {
        type: actionTypes
        payload: { expense?: Expense; id?: string; expenses?: Expense[] }
    }
): Expense[] {
    switch (action.type) {
        case "INITIALIZE_EXPENSES":
            if (!action.payload.expenses) {
                throw new Error(
                    "Expenses are required for INITIALIZE_EXPENSES action"
                )
            }
            return action.payload.expenses.reverse()
        case "ADD_EXPENSE":
            if (!action.payload.expense) {
                throw new Error("Expense is required for ADD_EXPENSE action")
            }
            // Generate a unique ID for the new expense
            return [{ ...action.payload.expense }, ...state]
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
    const [isFetching, setIsFetching] = useState(true) // State to track fetching status
    const [error, setError] = useState<string | null>(null)
    const [expenses, dispatch] = useReducer(expensesReducer, [])
    useEffect(() => {
        async function loadExpenses() {
            try {
                const expenses = await getExpenses()
                dispatch({
                    type: "INITIALIZE_EXPENSES",
                    payload: { expenses },
                })
            } catch (error) {
                setError("Failed to fetch expenses.")
            } finally {
                setIsFetching(false) // Set fetching to false after expenses are loaded
            }
        }
        loadExpenses()
    }, [])

    function getExpense(id: string): Expense | undefined {
        return expenses.find((expense) => expense.id === id)
    }

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
        isFetching,
        error,
        setError,
        addExpense,
        updateExpense,
        deleteExpense,
        getExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}
