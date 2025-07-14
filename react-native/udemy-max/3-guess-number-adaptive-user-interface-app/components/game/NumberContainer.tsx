import { StyleSheet, Text, View, Dimensions } from "react-native"
import React from "react"
import { deviceWindowWidth as deviceWidth } from "../../utilities/deviceParams/screenDimensions"

import Colors from "../../utilities/constants/colors"

export default function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const deviceWindowWidth = Dimensions.get("window").width
const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: Colors.accent500,
        padding: deviceWindowWidth < 380 ? 12 : 24,
        margin: deviceWindowWidth < 380 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: "open-sans-bold",
    },
})
