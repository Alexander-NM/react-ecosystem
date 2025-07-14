import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
} from "react-native"
import React from "react"
import { MealItemType } from "../models/meal"
import { useNavigation } from "@react-navigation/native"
import MealDetails from "./MealDetails"

export default function MealItem(props: MealItemType) {
    const navigation = useNavigation()

    function mealDetailHandler() {
        navigation.navigate("MealDetails", { mealId: props.id })
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => pressed && styles.buttonPressed}
                onPress={mealDetailHandler}
            >
                <MealDetails mealItem={props} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 20,
        overflow: Platform.select({ ios: "visible", android: "hidden" }),
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    buttonPressed: {
        opacity: 0.5,
    },
})
