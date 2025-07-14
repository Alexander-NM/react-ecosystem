import { Alert, StyleSheet } from "react-native"
import React, { useLayoutEffect } from "react"
import MapView, { Marker, MapPressEvent } from "react-native-maps"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/RootStack.types"
import { Location } from "../types/app.types"
import IconButton from "../components/UI/IconButton"

export default function Map({
    navigation,
    route,
}: NativeStackScreenProps<RootStackParamList, "Map">) {
    const [selectedLocation, setSelectedLocation] =
        React.useState<Location | null>(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="save"
                    color={tintColor}
                    onPress={savePickedLocationHandler}
                    size={24}
                />
            ),
        })
    }, [navigation, savePickedLocationHandler])

    function selectLocationHandler(event: MapPressEvent) {
        const { latitude, longitude } = event.nativeEvent.coordinate
        setSelectedLocation({ latitude, longitude })
    }

    function savePickedLocationHandler() {
        if (!selectedLocation) {
            Alert.alert(
                "No location picked",
                "Please pick a location by tapping on the map."
            )
            return
        }

        if (route.params?.onPickLocation) {
            route.params.onPickLocation(selectedLocation)
        }
        navigation.goBack()
    }

    return (
        <MapView
            onPress={selectLocationHandler}
            style={styles.mapContainer}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {selectedLocation && (
                <Marker title="Picked Location" coordinate={selectedLocation} />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
