import { StyleSheet, FlatList, View, Text } from "react-native"
import React from "react"
import { MEALS, CATEGORIES } from "../data/dummy-data"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/types"
import MealItem from "../components/MealItem"
import { MealItemType } from "../models/meal"

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

    function renderMealItems({ item }: { item: MealItemType }) {
        return (
            <View>
                <MealItem {...item} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                renderItem={renderMealItems}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
})
