import { FontAwesome } from "@expo/vector-icons"
import { observer } from "mobx-react"
import * as React from "react"
import { StyleSheet, Pressable } from "react-native"
import { ShoppinglistItem } from "../logic/shoppinglist"
import { ShoppinglistRow } from "./shoppinglist-row"
import { Text, View } from "./Themed"

export const ShoppinglistGroup = observer((props: {
    groupName: string
    open: boolean
    openChanged: (open: boolean) => void
    onRemove: (id: number) => void
    items: ShoppinglistItem[]
}) => {
    return (
        <View style={{
            flexDirection: "column",
            flexGrow: 1,
        }}>
            <Pressable style={{
                flexDirection: "row",
            }} onPress={() => {
                props.openChanged(!props.open)
            }}>
                <Text style={styles.groupTitle}>
                    {props.groupName}
                </Text>
                <FontAwesome name={props.open ? "chevron-up" : "chevron-down"}
                    style={styles.groupExpandingArrow}
                     />
            </Pressable>
            {props.open && props.items.map(p => (
                <ShoppinglistRow
                    key={p.id}
                    amount={p.amount}
                    name={p.name}
                    checked={p.completed}
                    onCheck={(s) => {
                        if (s) {
                            p.complete()
                        } else {
                            p.uncomplete()
                        }
                    }}
                    onIncrease={() => {
                        p.increaseAmount()
                    }}
                    onDecrease={() => {
                        p.decreaseAmount()

                        if (p.amount === 0) {
                            props.onRemove(p.id)
                        }
                    }}
                    onRemove={() => {
                        props.onRemove(p.id)
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
        alignContent: "flex-end"
    }
})