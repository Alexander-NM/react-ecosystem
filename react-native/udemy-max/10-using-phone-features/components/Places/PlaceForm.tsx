import { Alert, ScrollView, StyleSheet, Text, TextInput } from "react-native"
import React from "react"
import { ColorsPallete } from "../../constants/colors"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"
import CustomButton from "../UI/CustomButton"
import { Location } from "../../types/app.types"
import { getAddressFromLocation } from "../../util/location"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/RootStack.types"
import { Place } from "../../models/place"

export default function PlaceForm() {
    const [title, setTitle] = React.useState<string>("")
    const [image, setImage] = React.useState<string>("")
    const [location, setLocation] = React.useState<Location | null>(null)
    const [address, setAddress] = React.useState<string>("")

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    React.useEffect(() => {
        if (location) {
            getAddressFromLocation(location)
                .then((address) => {
                    setAddress(address)
                })
                .catch((error) => {
                    console.error("Error fetching address:", error)
                })
        }
    }, [location])

    function savePlaceHandler() {
        if (!title || !location) {
            Alert.alert("Please fill in title and location fields.")
            return
        }

        const newPlace = new Place(title, image, address, location)
        navigation.popTo("AllPlaces", {
            Place: newPlace,
        })
    }

    return (
        <ScrollView style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                onChangeText={setTitle}
                placeholder="Title"
                value={title}
                style={styles.input}
            />
            <ImagePicker onTakeImage={setImage} pickedImage={image} />
            <LocationPicker onPickLocation={setLocation} location={location} />
            <CustomButton style={styles.button} onPress={savePlaceHandler}>
                Add Place
            </CustomButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 18,
        borderBottomColor: ColorsPallete.primary700,
        borderBottomWidth: 2,
        backgroundColor: ColorsPallete.primary100,
        borderRadius: 4,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: ColorsPallete.primary500,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
    },
})
