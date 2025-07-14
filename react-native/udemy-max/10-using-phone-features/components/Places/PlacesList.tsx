import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import { PlaceType } from "../../types/app.types"
import PlaceItem from "./PlaceItem"
import { ColorsPallete } from "../../constants/colors"

export default function PlacesList({ places }: { places: PlaceType[] }) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No places found. Maybe add one?
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PlaceItem onSelect={() => {}} place={item} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: ColorsPallete.primary200,
    },
})
