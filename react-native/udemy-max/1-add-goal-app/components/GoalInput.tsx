import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native"
import { useState } from "react"
import goalImage from "../assets/images/goal.png"

function GoalInput({ onAddGoal, visible, onCancel }) {
    const [enteredGoalText, setEnteredGoalText] = useState("")

    function goalInputHandler(enteredText: string) {
        setEnteredGoalText(enteredText)
    }
    
    console.log("Goal input")

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={goalImage} />

                <TextInput
                    onChangeText={goalInputHandler}
                    style={styles.textInput}
                    placeholder="Your course goal!"
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            onPress={onCancel}
                            title="Cancel"
                            color="#b180f0"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Add goal"
                            onPress={() => {
                                onAddGoal(enteredGoalText)
                                setEnteredGoalText("")
                            }}
                            color="#e4d0ff"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#311b6b",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        marginRight: 8,
        padding: 16,
        backgroundColor: "#e4d0ff",
        color: "#120438",
        borderRadius: 6,
        marginTop: 30,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        gap: 5,
    },
    button: {
        width: "40%",
        marginHorizontal: 8,
    },
    image: {
        width: 100,
        height: 100,
    },
})

export default GoalInput
