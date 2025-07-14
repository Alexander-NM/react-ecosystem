import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { MealItemType } from "../models/meal"
import { MealDetailsScreenStyles } from "../screens/MealDetailsScreen"

export default function MealDetails({
    mealItem,
    mealItemStyle,
}: {
    mealItem: MealItemType
    mealItemStyle?: MealDetailsScreenStyles
}) {
    return (
        <View style={styles.innerContainer}>
            <View>
                <Image
                    style={[styles.image, mealItemStyle?.image]}
                    source={{ uri: mealItem.imageUrl }}
                />
                <Text style={[styles.title, mealItemStyle?.title]}>{mealItem.title}</Text>
            </View>

            <View style={styles.details}>
                <Text style={[styles.detailItem, mealItemStyle?.detailText]}>{mealItem.duration}m</Text>
                <Text style={[styles.detailItem, mealItemStyle?.detailText]}>
                    {mealItem.complexity.toUpperCase()}
                </Text>
                <Text style={[styles.detailItem, mealItemStyle?.detailText]}>
                    {mealItem.affordability.toUpperCase()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        borderRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        margin: 12,
    },
    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        gap: 10,
    },
    detailItem: {
        fontSize: 12,
    },
})
