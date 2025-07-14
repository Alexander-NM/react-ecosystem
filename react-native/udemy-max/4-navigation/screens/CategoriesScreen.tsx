import { StyleSheet, FlatList } from "react-native"
import React from "react"
import { CATEGORIES } from "../data/dummy-data"
import CategoryGridTile from "../components/CategoryGridTile"
import { CategoryItem } from "../models/category"
import { CategoriesDrawProps } from "../navigation/types"

export default function CategoriesScreen({
    navigation,
}: CategoriesDrawProps<"MealsCategories">) {
    
    function pressHandler(item: CategoryItem) {
        navigation.navigate("MealsOverview", {
            categoryId: item.id,
        })
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <CategoryGridTile
                    {...item}
                    onPress={pressHandler.bind(null, item)}
                />
            )}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({})
