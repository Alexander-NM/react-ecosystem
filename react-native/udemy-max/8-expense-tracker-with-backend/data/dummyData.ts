export const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "Groceries",
        amount: 94.12,
        date: new Date("2025-06-01"),
    },
    {
        id: "e2",
        description: "Gas",
        amount: 25.99,
        date: new Date("2025-06-02"),
    },
    {
        id: "e3",
        description: "Rent",
        amount: 1200.0,
        date: new Date("2025-06-03"),
    },
    {
        id: "e4",
        description: "Utilities",
        amount: 150.75,
        date: new Date("2025-06-04"),
    },
    {
        id: "e5",
        description: "Internet",
        amount: 60.0,
        date: new Date("2025-06-05"),
    },
    {
        id: "e6",
        description: "Phone Bill",
        amount: 45.0,
        date: new Date("2025-06-06"),
    },
    {
        id: "e7",
        description: "Dining Out",
        amount: 78.5,
        date: new Date("2025-06-07"),
    },
    {
        id: "e8",
        description: "Gym Membership",
        amount: 35.0,
        date: new Date("2025-06-08"),
    },
    {
        id: "e9",
        description: "Clothing",
        amount: 120.0,
        date: new Date("2025-06-09"),
    },
    {
        id: "e10",
        description: "Entertainment",
        amount: 65.0,
        date: new Date("2025-06-10"),
    },
    {
        id: "e11",
        description: "Medical Expenses",
        amount: 200.0,
        date: new Date("2025-06-11"),
    },
    {
        id: "e12",
        description: "Travel",
        amount: 300.0,
        date: new Date("2025-06-12"),
    },
    {
        id: "e13",
        description: "Books",
        amount: 45.0,
        date: new Date("2025-06-15"),
    },
    {
        id: "e14",
        description: "Gifts",
        amount: 150.0,
        date: new Date("2025-06-16"),
    },
    {
        id: "e15",
        description: "Household Supplies",
        amount: 80.0,
        date: new Date("2025-06-27"),
    },
    {
        id: "e16",
        description: "Car Maintenance",
        amount: 250.0,
        date: new Date("2025-06-28"),
    },
]

export type Expense = typeof DUMMY_EXPENSES[number]