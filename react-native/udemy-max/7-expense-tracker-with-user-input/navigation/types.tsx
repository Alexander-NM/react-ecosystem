import { NavigatorScreenParams } from "@react-navigation/native"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

// Define the types for props used in the Expenses tab
export type ExpensesTabProps<T extends keyof BottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabParamList, T>,
        NativeStackScreenProps<RootStackParamList>
    >

export type RootStackParamList = {
    ExpensesOverview: NavigatorScreenParams<BottomTabParamList>
    ManageExpense:  { expenseId: string } | undefined
}
export type BottomTabParamList = {
    RecentExpenses: undefined
    AllExpenses: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
