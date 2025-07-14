import React, { useEffect, useLayoutEffect } from "react"
import PlacesList from "../components/Places/PlacesList"
import { RootStackParamList } from "../types/RootStack.types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Place } from "../models/place"
import IconButton from "../components/UI/IconButton"

export default function AllPlaces({
    route,
    navigation,
}: NativeStackScreenProps<RootStackParamList, "AllPlaces">) {
    const [places, setPlaces] = React.useState<Place[]>([])
    useEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="add"
                    color={tintColor}
                    size={24}
                    onPress={() => navigation.navigate("AddPlace")}
                />
            ),
        })
    }, [navigation, IconButton])

    React.useEffect(() => {
        const place = route.params?.Place
        if (place) {
            setPlaces((prevPlaces) => [...prevPlaces, place])
        }
    }, [route, setPlaces])

    return <PlacesList places={places} />
}
