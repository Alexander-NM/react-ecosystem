import { StyleSheet, Text, View } from "react-native"
import React from "react"

export default function List({ listItems }: { listItems: string[] }) {
    return listItems.map((ingredient: string, index: number) => (
        <Text style={styles.listItem} key={index}>{ingredient}</Text>
    ))
}

const styles = StyleSheet.create({
    listItem: {
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#A07F6BFF",
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 15
    }
})
