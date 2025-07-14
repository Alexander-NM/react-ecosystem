import { StyleSheet, Text, View } from "react-native"
import { getData } from "../util/http"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../store/auth-context"

function WelcomeScreen() {
    const [fetchedMessage, setFetchedMessage] = useState<string | null>(null)
    const authCtx = useContext(AuthContext)
    const token = authCtx.authToken

    useEffect(() => {
        async function fetchData() {
            try {
                const message = await getData(token)
                setFetchedMessage(message)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [token])

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            {fetchedMessage && <Text>{fetchedMessage}</Text>}
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
})
