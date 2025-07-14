import { View, Text, Button, StyleSheet } from "react-native"
import { RootStackParamList } from "../navigation/types"
import { DrawerScreenProps } from "@react-navigation/drawer"


type Props = DrawerScreenProps<RootStackParamList, "user">
function UserScreen({ navigation }: { navigation: any }) {
    return (
        <View style={styles.rootContainer}>
            <Text>
                This is the <Text style={styles.highlight}>"User"</Text> screen!
            </Text>
            <Button
                title="Open Drawer"
                onPress={() => {
                    navigation.openDrawer()
                }}
            />
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    highlight: {
        fontWeight: "bold",
        color: "#eb1064",
    },
})
