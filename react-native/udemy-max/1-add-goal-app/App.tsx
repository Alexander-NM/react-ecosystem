import { useState } from "react"
import { StyleSheet, View, FlatList, Button } from "react-native"

import GoalItem from "./components/GoalItem"
import GoalInput from "./components/GoalInput"
import { StatusBar } from "expo-status-bar"

export default function App() {
    const [courseGoals, setCourseGoals] = useState([])
    const [modalIsVisible, setModalIsVisible] = useState(false)

    function startAddGoalHandler() {
        setModalIsVisible(true)
    }

    function endAddGoalHandler() {
        setModalIsVisible(false)
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            { text: enteredGoalText, id: Math.random().toString() },
        ])
        endAddGoalHandler()
    }

    function deleteGoalHander(id) {
        setCourseGoals((currentGoals) =>
            currentGoals.filter((goal) => goal.id !== id)
        )
    }

    return (
        <>
            <StatusBar style="light"/>
            <View style={styles.appContainer}>
                <Button
                    title="Add new goal"
                    color="#5e0acc"
                    onPress={startAddGoalHandler}
                />
                <GoalInput
                    visible={modalIsVisible}
                    onAddGoal={addGoalHandler}
                    onCancel={endAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={({ item, index }) => {
                            return (
                                <GoalItem
                                    onDeleteItems={deleteGoalHander}
                                    goalText={item.text}
                                    id={item.id}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingInline: 16,
        flex: 1,
        backgroundColor: "#e4d0ff",
    },
    goalsContainer: {
        flex: 4,
    },
})
