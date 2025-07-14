import {
    StyleSheet,
    Text,
    View,
    TextStyle,
    ImageStyle,
    ScrollView,
    Button,
} from "react-native"
import React from "react"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/types"
import { MEALS } from "../data/dummy-data"
import MealDetails from "../components/MealDetails"
import { MealItemType } from "../models/meal"
import List from "../components/List"
import IconButton from "../components/IconButton"

export interface MealDetailsScreenStyles {
    image: ImageStyle
    title: TextStyle
    detailText: TextStyle
}

type Props = NativeStackScreenProps<RootStackParamList, "MealDetails">
export default function MealDetailsScreen({ route, navigation }: Props) {
    const mealId = route.params.mealId
    const meal: MealItemType | undefined = MEALS.find(
        (item) => item.id === mealId
    )
    if (!meal) {
        return
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton size={18} name="star" onPress={headerButtonPressHandler} />,
        })
    }, [navigation, headerButtonPressHandler])

    function headerButtonPressHandler() {
        console.log("Pressed")
    }
    return (
        <ScrollView style={styles.rootContainer}>
            <MealDetails mealItemStyle={styles} mealItem={meal} />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Text style={styles.subTitle}>Ingredients</Text>
                    <List listItems={meal.ingredients} />
                    <Text style={styles.subTitle}>Steps</Text>
                    <List listItems={meal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 25,
    },
    image: {
        height: 350,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        margin: 12,
        color: "white",
    },
    detailText: {
        color: "white",
    },
    subTitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 4,
        marginHorizontal: 24,
        paddingBottom: 12,
        textAlign: "center",
        borderBottomColor: "#e2b497",
        borderBottomWidth: 2,
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    },
})
