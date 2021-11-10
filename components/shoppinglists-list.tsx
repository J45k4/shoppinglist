import * as React from "react"
import {  StyleSheet } from 'react-native';
import { Text, View } from "./Themed"
import { observer } from "mobx-react"
import { ShoppinglistRepository, useShoppinglistStore } from "../logic/shoppinglist-repository"
import { FontAwesome } from "@expo/vector-icons"

const Row = (props: {
    title: string
    completedItems: number
    allItems: number
    onPress: () => void
    onRemove: () => void
}) => {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 15
        }}>
            <Text onPress={props.onPress} style={styles.rowText}>
                {props.title + " "}
                {props.completedItems} / {props.allItems}
            </Text>
            <FontAwesome name="trash" style={styles.removeButton} onPress={props.onRemove} />
        </View>
    )
}

export const ShoppinglistsList = observer((props: {
    onShoppinglistClicked: (shoppinglistId: number) => void
}) => {
    const shoppinglistStore = useShoppinglistStore()
    
    return (
        <View style={styles.container}>
            {shoppinglistStore.shoppinglists.map(p => (
                <Row key={p.id} title={p.name} 
                    allItems={p.countItems()} 
                    completedItems={p.countCompletedItems()} 
                    onPress={() => {
                        props.onShoppinglistClicked(p.id)
                    }} onRemove={() => {
                        shoppinglistStore.removeShoppinglist(p)
                    }} />
            ))}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    rowText: {
        fontSize: 20
    },
    removeButton: {
        marginLeft: 5,
        fontSize: 25,
    }
})