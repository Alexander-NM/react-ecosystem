import { StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/RootStack.types"
import AddPlace from "../screens/AddPlace"
import AllPlaces from "../screens/AllPlaces"
import IconButton from "../components/UI/IconButton"
import { ColorsPallete } from "../constants/colors"
import Map from "../screens/Map"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNativeStack() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: ColorsPallete.primary500,
                        },
                        headerTintColor: ColorsPallete.gray700,
                        contentStyle: {
                            backgroundColor: ColorsPallete.gray700,
                        },
                    }}
                >
                    <Stack.Screen
                        options={{
                            title: "Your Favorite Places",
                        }}
                        name="AllPlaces"
                        component={AllPlaces}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{ title: "Add a New Place" }}
                    />

                    <Stack.Screen name="Map" component={Map} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
