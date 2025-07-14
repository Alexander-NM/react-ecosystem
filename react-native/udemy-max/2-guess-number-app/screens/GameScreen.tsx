import { StyleSheet, View, Alert, Text, FlatList } from "react-native"
import { useState, useRef, useEffect } from "react"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import TwoHorizontalButtons from "../components/ui/TwoHorizontalButtons"
import Ionicons from "@expo/vector-icons/Ionicons"
import GuesLogItem from "../components/game/GuesLogItem"

function generateRandomBetween(min: number, max: number, exclude: number) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

export default function GameScreen({ guessingNumber, onGameOver }) {
    const minBoundary = useRef(1)
    const maxBoundary = useRef(100)

    const [userGuess, setuserGuess] = useState(() =>
        generateRandomBetween(
            minBoundary.current,
            maxBoundary.current,
            guessingNumber
        )
    )
    const [userAttempts, setUserAttempts] = useState([userGuess])

    useEffect(() => {
        if (userGuess === guessingNumber) {
            onGameOver(userAttempts.length)
        }
    }, [userGuess])

    function nextGuesHandler(direction: "lower" | "greater") {
        if (
            (direction === "lower" && userGuess < guessingNumber) ||
            (direction === "greater" && userGuess > guessingNumber)
        ) {
            Alert.alert(`It's wrong`, `It's incorrect hint...`, [
                { text: "Ok", style: "cancel" },
            ])
            return
        }

        if (direction === "lower") {
            maxBoundary.current = userGuess
        } else {
            minBoundary.current = userGuess + 1
        }

        const newUserGuess = generateRandomBetween(
            minBoundary.current,
            maxBoundary.current,
            userGuess
        )
        setuserGuess(newUserGuess)
        setUserAttempts((prev) => [newUserGuess, ...prev])
    }

    const guesses = userAttempts.length

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{userGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.introText}>
                    Higher or lower?
                </InstructionText>
                <TwoHorizontalButtons
                    leftBtn={{
                        handler: () => nextGuesHandler("lower"),
                        title: (
                            <Ionicons name="remove" size={24} color="black" />
                        ),
                    }}
                    rightBtn={{
                        handler: () => nextGuesHandler("greater"),
                        title: <Ionicons name="add" size={24} color="black" />,
                    }}
                />
            </Card>
            <View style={styles.listContainer}>
                {/* {userAttempts.map((guessRound) => (
                    <Text key={guessRound}>{guessRound}</Text>
                ))} */}
                <FlatList
                    data={userAttempts}
                    renderItem={({ index, item }) => {
                        return (
                            <GuesLogItem
                                guess={item}
                                roundNumber={guesses - index}
                            />
                        )
                    }}
                    keyExtractor={(item) => item.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
    },
    introText: { marginBottom: 25 },
    listContainer: {
        flex: 1,
        padding: 16
    },
})
