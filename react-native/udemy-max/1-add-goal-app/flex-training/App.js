import React from "react"
import { Text, View } from "react-native"

export default function App() {
    return (
        <View
            style={{
                padding: 50,
                flexDirection: "row",
                height: 300,
                width: "80%",
                borderWidth: 2, 
                borderColor: 'red',
                // alignItems: "center",
                justifyContent: "space-around",
                // flex: 1
            }}
        >
            <View
                style={{
                    backgroundColor: "red",
                    // width: 100,
                    // height: 100,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <Text>1</Text>
            </View>
            <View
                style={{
                    backgroundColor: "blue",
                    flex: 1,
                    // width: 100,
                    // height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <Text>2</Text>
            </View>
            <View
                style={{
                    backgroundColor: "green",
                    flex: 1,
                    // width: 100,
                    // height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>3</Text>
            </View>
        </View>
    )
}
