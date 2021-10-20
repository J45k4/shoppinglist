import { FontAwesome } from "@expo/vector-icons"
import { observer } from "mobx-react"
import * as React from "react"
import { StyleSheet } from "react-native"
import { ShoppinglistItem } from "../logic/shoppinglist"
import { ShoppinglistRow } from "./shoppinglist-row"
import { Text, View } from "./Themed"

export const ShoppinglistGroup = observer((props: {
    groupName: string
    open: boolean
    openChanged: (open: boolean) => void
    items: ShoppinglistItem[]
}) => {
    return (
        <View style={{
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor: "#94d6ae"
        }}>
            <View style={{
                flexDirection: "row",
                backgroundColor: "#178041"
            }}>
                <Text style={styles.groupTitle}>
                    {props.groupName}
                </Text>
                <FontAwesome name={props.open ? "chevron-up" : "chevron-down"}
                    style={styles.groupExpandingArrow}
                    onPress={() => {
                        props.openChanged(!props.open)
                    }} />
            </View>
            {props.open && props.items.map(p => (
                <ShoppinglistRow
                    key={p.id}
                    amount={p.amount}
                    name={p.name}
                    completed={p.completed}
                    onCompleted={() => {
                        p.complete()
                    }}
                    onUncompleted={() => {
                        p.uncomplete()
                    }}
                    onIncrease={() => {
                        p.increaseAmount()
                    }}
                    onDecrease={() => {
                        p.decreaseAmount()
                    }}
                />
            ))}
        </View>
    )
})

const styles = StyleSheet.create({
    groupTitle: {
        flex: 1,
        fontSize: 25
    },
    groupExpandingArrow: {
        fontSize: 25,
        color: "white",
        alignContent: "flex-end"
    }
})