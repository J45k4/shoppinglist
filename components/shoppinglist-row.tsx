import { FontAwesome } from "@expo/vector-icons"
import * as React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "./Themed"

export const ShoppinglistRow = (props: {
    name: string
    amount: number
    completed: boolean
    onCompleted: () => void
    onUncompleted: () => void
    onIncrease: () => void
    onDecrease: () => void
}) => {
    return (
        <View style={{
            flexDirection: "row",
            // justifyContent: "space-evenly",
            height: 50
        }}>
            <View style={styles.leftSide}>
                {!props.completed &&
                <FontAwesome name="square" style={styles.checkbox} onPress={() => {
                    props.onCompleted()
                }} />}
                {props.completed &&
                <FontAwesome name="check-square" style={styles.checkbox} onPress={() => {
                    props.onUncompleted()
                }} />}
                <Text style={{
                    fontSize: 30
                }}>
                    {props.name}
                </Text>
            </View>
            <View style={styles.rightSize}>
                <FontAwesome name="minus" style={styles.minusButton} onPress={props.onDecrease} />
                <Text style={{
                    fontSize: 30,
                    margin: 5
                }}>
                    {props.amount}
                </Text>
                <FontAwesome name="plus" style={styles.plusButton} onPress={props.onIncrease} /> 
            </View>               
        </View>
    )
}

const styles = StyleSheet.create({
    leftSide: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
        backgroundColor: "#ffe5cc"
    },
    rightSize: {
        backgroundColor: "#ffba7a",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    checkbox: {
        color: "white",
        fontSize: 30,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10
    },
    minusButton: {
        marginTop: 10,
        color: "white",
        fontSize: 30,
        margin: 5
    },
    plusButton: {
        marginTop: 10,
        color: "white",
        fontSize: 30,
        margin: 5
    }
})