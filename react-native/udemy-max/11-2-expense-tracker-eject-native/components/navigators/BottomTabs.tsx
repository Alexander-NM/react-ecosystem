import React, { use } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AllExpenses from "../../screens/AllExpenses"
import RecentExpenses from "../../screens/RecentExpenses"
import { GlobalStyles } from "../../constants/styles"
import { Ionicons, AntDesign } from "@expo/vector-icons"
import IconButton from "../ui/IconButton"
import { BottomTabParamList } from "../../navigation/types"
import { useNavigation } from "@react-navigation/native"

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabs() {
    const navigator = useNavigation()

    // Custom header right button component
    function HeaderRightButton({ color }: { color: string | undefined }) {
        return (
            <IconButton
                icon="add"
                size={24}
                color={color}
                onPress={() => navigator.navigate("ManageExpense")}
            />
        )
    }
    // Bottom tab navigator with two screens: RecentExpenses and AllExpenses
    return (
        <BottomTab.Navigator
        // Navigation options for the bottom tab navigator. It can not be used for  the first parent level navigation to ManageExpenses.     
        screenOptions={({ navigation }) => ({ 
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                tabBarInactiveTintColor: "white",
                headerRight: ({ tintColor }) => (
                    <HeaderRightButton color={tintColor} />
                ),
            })}
        >
            <BottomTab.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="bars" size={size} color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    )
}
