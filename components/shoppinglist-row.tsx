import { FontAwesome } from "@expo/vector-icons"
import * as React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "./Themed"

export const ShoppinglistRow = (props: {
    name: string
    amount?: number
    checked?: boolean
    onCheck?: (status: boolean) => void
    onUnchecked?: () => void
    onIncrease?: () => void
    onDecrease?: () => void
    onRemove?: () => void
}) => {
    return (
        <View style={{
            flexDirection: "row",
            // justifyContent: "space-evenly",
            height: 50
        }}>
            <View style={styles.leftSide}>
                {props.checked === false &&
                <FontAwesome name="square-o" style={styles.checkbox} onPress={() => {
                    if (props.onCheck) {
                        props.onCheck(true)
                    }
                }} />}
                {props.checked === true &&
                <FontAwesome name="check-square-o" style={styles.checkbox} onPress={() => {
                    if (props.onCheck) {
                        props.onCheck(false)
                    }
                }} />}
                <Text style={styles.name}>
                    {props.name}
                </Text>
            </View>
            {props.amount != null &&
            <View style={styles.rightSize}>
                <FontAwesome name="minus" style={styles.minusButton} onPress={props.onDecrease} />
                <Text style={{
                    fontSize: 20,
                    margin: 5
                }}>
                    {props.amount}
                </Text>
                <FontAwesome name="plus" style={styles.plusButton} onPress={props.onIncrease} />

                {props.onRemove &&
                <FontAwesome name="trash" style={styles.trashIcon} onPress={props.onRemove} />}
            </View>}
        </View>
    )
}

const fontSize = 23

const styles = StyleSheet.create({
    leftSide: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    rightSize: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    name: {
        fontSize: fontSize
    },
    checkbox: {
        fontSize: fontSize,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10
    },
    minusButton: {
        marginTop: 10,
        fontSize: fontSize,
        margin: 5
    },
    plusButton: {
        marginTop: 10,
        fontSize: fontSize,
        margin: 5
    },
    trashIcon: {
        marginTop: 10,
        fontSize: fontSize,
        margin: 5
    }
})