import {
    StyleSheet,
    Image,
    View,
    Text,
    useWindowDimensions,
    ScrollView,
} from "react-native"
import Title from "../components/ui/Title"
import React from "react"
import Colors from "../utilities/constants/colors"
import PrimaryButton from "../components/ui/PrimaryButton"

export default function GameOverScreen({
    roundsNumber,
    guessingNumber,
    onStartNewGame,
}) {
    const { width, height } = useWindowDimensions()

    let imageSize = 280
    if (width < 380) {
        imageSize = 220
    } else if (width > height) {
        imageSize = 120
    }

    return (
        <View style={styles.rootContainer}>
            <ScrollView>
                <Title>Game Over</Title>
                <View
                    style={[
                        styles.imageContainer,
                        {
                            width: imageSize,
                            height: imageSize,
                            borderRadius: imageSize / 2,
                        },
                    ]}
                >
                    <Image
                        style={styles.image}
                        source={require("../assets/images/success.png")}
                    />
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed{" "}
                    <Text style={styles.highlightText}>{roundsNumber}</Text>{" "}
                    round to guess the number{" "}
                    <Text style={styles.highlightText}>{guessingNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>
                    Start New Game
                </PrimaryButton>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        overflow: "hidden",
        borderWidth: 3,
        borderColor: Colors.primary500,
        margin: 15,
        alignSelf: "center",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    summaryText: {
        fontFamily: "open-sans",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 30,
    },
    highlightText: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500,
    },
})
