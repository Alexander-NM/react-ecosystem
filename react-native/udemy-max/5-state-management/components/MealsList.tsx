import { StyleSheet, FlatList, View } from "react-native"
import React from "react"
import MealItem from "./MealItem"
import { MealItemType } from "../models/meal"

export default function MealsList({mealItems}: { mealItems: MealItemType[] }) {
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
                data={mealItems}
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
