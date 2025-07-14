import { StatusBar } from "expo-status-bar"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import RootNativeStack from "./components/navigators/RootNativeStack"
import ExpensesContextProvider from "./store/expenses-context"

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <ExpensesContextProvider>
                    <RootNativeStack />
                </ExpensesContextProvider>
            </NavigationContainer>
        </>
    )
}
