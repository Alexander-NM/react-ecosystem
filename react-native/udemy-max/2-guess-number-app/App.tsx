import {
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import StartGameScreen from "./screens/StartGameScreen"
import GameScreen from "./screens/GameScreen"

import Colors from "./constants/colors"
import GameOverScreen from "./screens/GameOverScreen"

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [guessingNumber, setguessingNumber] = useState(null)
    const [gameIsOver, setgameIsOver] = useState(false)
    const [roundsNumber, setroundsNumber] = useState(0)

    const [loaded, error] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    })

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }

    function pickedNumberHandler(pickedNumber) {
        setguessingNumber(pickedNumber)
    }

    function gameOverHandler(roundsNumber: number) {
        setgameIsOver(true)
        setroundsNumber(roundsNumber)
    }

    function startNewGameHandler() {
        setguessingNumber(null)
        setgameIsOver(false)
    }

    let currentScreen
    if (gameIsOver) {
        currentScreen = (
            <GameOverScreen
                roundsNumber={roundsNumber}
                guessingNumber={guessingNumber}
                onStartNewGame={startNewGameHandler}
            />
        )
    } else if (guessingNumber) {
        currentScreen = (
            <GameScreen
                guessingNumber={guessingNumber}
                onGameOver={gameOverHandler}
            />
        )
    } else {
        currentScreen = <StartGameScreen onPickNumber={pickedNumberHandler} />
    }

    return (
        <LinearGradient
            colors={[Colors.primary500, Colors.accent500]}
            style={styles.rootScreen}
        >
            <ImageBackground
                source={require("./assets/images/background.png")}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView
                    style={[styles.rootScreen, styles.androidSafeArea]}
                >
                    {currentScreen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    androidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
        opacity: 0.4,
    },
})
