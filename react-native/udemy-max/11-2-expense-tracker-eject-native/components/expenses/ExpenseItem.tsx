import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"
import { useNavigation } from "@react-navigation/native"

export default function ExpenseItem({
    description,
    date,
    amount,
    id,
}: {
    amount: number
    description: string
    date: Date
    id: string
}) {
    const navigation = useNavigation()
    function expressPressHandler() {
        navigation.navigate("ManageExpense", { expenseId: id })
    }

    return (
        <Pressable
            onPress={expressPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.5,
    },
})
