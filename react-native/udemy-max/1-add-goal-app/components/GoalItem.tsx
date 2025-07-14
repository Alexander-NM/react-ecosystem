import { View, Text, StyleSheet, Pressable } from "react-native"

function GoalItem({ goalText, id, onDeleteItems }) {
    return (
        <Pressable
            android_ripple={{ color: "red" }}
            onPress={onDeleteItems.bind(null, id)}
            style={({ pressed }) => {
                return pressed && styles.pressedItem
            }}
        >
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>{goalText}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#5e0acc",
    },
    goalText: {
        padding: 8,
        color: "white",
    },
    pressedItem: {
        opacity: 0.5,
    },
})

export default GoalItem
