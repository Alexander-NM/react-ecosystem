import { Button, StyleSheet, Alert, View, Image, Text } from "react-native"
import React from "react"
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker"
import { ColorsPallete } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"

export default function ImagePicker({
    onTakeImage,
    pickedImage
}: {
    onTakeImage: (imageUri: string) => void
    pickedImage: string
}) {
    const [cameraPermissionStatus, requestCameraPermission] =
        useCameraPermissions()

    async function verifyPermissions() {
        if (cameraPermissionStatus?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestCameraPermission()
            return permissionResponse.granted
        }

        if (cameraPermissionStatus?.status === PermissionStatus.DENIED) {
            Alert.alert(
                "You need to grant camera permissions to use this feature."
            )
            return false
        }

        return true
    }

    async function pickImageHandler() {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }

        try {
            const image = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
            })
            if (!image.canceled) {
                onTakeImage(image.assets[0].uri)
            } else {
                Alert.alert("No image selected")
            }
        } catch (error: any) {
            Alert.alert("Error picking image", error.message || "Unknown error")
        }
    }

    let imageContent = (
        <Text style={styles.noImageText}>No image picked yet.</Text>
    )
    if (pickedImage) {
        imageContent = (
            <Image source={{ uri: pickedImage }} style={styles.image} />
        )
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imageContent}</View>
            <OutlinedButton icon="camera" onPress={pickImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsPallete.primary100,
    },
    noImageText: {
        color: ColorsPallete.primary700,
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: "100%",
    },
})
