import React from "react"
import ManageExpense from "../../screens/ManageExpense"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabs from "./BottomTabs"
import { RootStackParamList } from "../../navigation/types"
import { GlobalStyles } from "../../constants/styles"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNativeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name="ExpensesOverview"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{ presentation: "modal" }}
            />
        </Stack.Navigator>
    )
}
