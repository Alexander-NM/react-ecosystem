import { StyleSheet, Text, View } from "react-native"
import React from "react"
import PrimaryButton from "./PrimaryButton"

type Button = { title: string | React.ReactNode; handler: () => void }

export default function TwoHorizontalButtons({
    leftBtn,
    rightBtn,
}: {
    leftBtn: Button
    rightBtn: Button
}) {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <PrimaryButton onPress={leftBtn.handler}>
                    {leftBtn.title}
                </PrimaryButton>
            </View>
            <View style={styles.button}>
                <PrimaryButton onPress={rightBtn.handler}>
                    {rightBtn.title}
                </PrimaryButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        // marginTop: 22,
    },
    button: {
        flex: 1,
    },
})
