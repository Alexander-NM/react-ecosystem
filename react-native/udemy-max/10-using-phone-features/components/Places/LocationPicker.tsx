import { StyleSheet, Alert, View, Text, Image } from "react-native"
import React, { useState } from "react"
import OutlinedButton from "../UI/OutlinedButton"
import { ColorsPallete } from "../../constants/colors"
import {
    useForegroundPermissions,
    PermissionStatus,
    getCurrentPositionAsync,
} from "expo-location"
import { getMapPreview } from "../../util/location"
import { useNavigation } from "@react-navigation/native"
import { Location } from "../../types/app.types"

export default function LocationPicker({
    onPickLocation,
    location,
}: {
    onPickLocation: (location: Location | null) => void
    location: Location | null
}) {
    const [locationPermission, requestLocationPermission] =
        useForegroundPermissions()

    const navigation = useNavigation()

    async function verifyPermissions() {
        if (locationPermission?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestLocationPermission()
            return permissionResponse.granted
        }

        if (locationPermission?.status === PermissionStatus.DENIED) {
            Alert.alert(
                "You need to grant location permissions to use this feature."
            )
            return false
        }

        return true
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }

        try {
            const location = await getCurrentPositionAsync()
            onPickLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An unknown error occurred"
            console.error(errorMessage)
        }
    }

    function pickOnMapHandler() {
        navigation.navigate("Map", { onPickLocation })
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (location) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(location.latitude, location.longitude),
                }}
            />
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon="location">
                    Locate user
                </OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon="map">
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsPallete.primary100,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
})
