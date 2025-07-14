import { StyleSheet, Text, View } from "react-native"
import React from "react"
import MealsList from "../components/MealsList"
import { FavoritesContext } from "../store/context/favorites-context"
import { MEALS } from "../data/dummy-data"
import { useSelector } from "react-redux"
import { RootState, AppDispatch } from "../store/redux/store"

export default function FavoritesScreen() {
    // const favMealsCtx = React.useContext(FavoritesContext)
    const favMealsState = useSelector((state: RootState) => state.favoritesMeals)

    // Another way to filter the meals based on favorite ids
    // This is commented out because it is less efficient than the one below
    // It creates an array of arrays, which is not needed here
    // It is better to filter the meals directly

    // const displayedMeals = favMealsCtx.ids.map((id) =>
    //     MEALS.filter((meal) => meal.id.includes(id))
    // )

    const displayedMeals = MEALS.filter((meal) =>
        favMealsState.ids.includes(meal.id)
    )

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.text}>You have no favorite meals yet!</Text>
            </View>
        )
    }
    return <MealsList mealItems={displayedMeals} />
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: "#C9C9C9FF",
        fontWeight: "bold",
        textAlign: "center",
        padding: 16,
    },
})
