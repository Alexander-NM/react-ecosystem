import { View, TextInput, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import Colors from "../constants/colors"
import Title from "../components/ui/Title"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import TwoHorizontalButtons from "../components/ui/TwoHorizontalButtons"

function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEnteredNumber] = useState("")

    function numberInputHander(enteredNumber: string) {
        setEnteredNumber(enteredNumber)
    }

    function resetInputHander() {
        setEnteredNumber("")
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number",
                "Number has to be a number between 1 and 99",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHander,
                    },
                ]
            )
            return
        }

        onPickNumber(chosenNumber)
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess my number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={numberInputHander}
                    value={enteredNumber}
                />
                <TwoHorizontalButtons
                    leftBtn={{
                        handler: resetInputHander,
                        title: "Reset",
                    }}
                    rightBtn={{
                        handler: confirmInputHandler,
                        title: "Confirm",
                    }}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center",
    },

    numberInput: {
        height: 60,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 16,
        fontWeight: "bold",
    },
})

export default StartGameScreen
