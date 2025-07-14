import { StyleSheet } from "react-native"
import React from "react"
import { MEALS, CATEGORIES } from "../data/dummy-data"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/types"
import MealsList from "../components/MealsList"

type Props = NativeStackScreenProps<RootStackParamList, "MealsOverview">
export default function MealsOverviewScreen({ route, navigation }: Props) {
    const catId = route.params.categoryId
    const displayedMeals = MEALS.filter((meal) =>
        meal.categoryIds.includes(catId)
    )

    React.useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(
            (item) => item.id === catId
        )?.title
        navigation.setOptions({ title: categoryTitle })
    }, [catId])

    return <MealsList mealItems={displayedMeals} />
}

const styles = StyleSheet.create({})
