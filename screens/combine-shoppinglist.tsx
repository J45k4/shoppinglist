import { FontAwesome } from "@expo/vector-icons"
import * as React from "react"
import { Button, Pressable, StyleSheet } from "react-native"
import { NiceLine } from "../components/nice-line"
import { ProgressDot } from "../components/progress-dot"
import { ShoppinglistRow } from "../components/shoppinglist-row"
import { Text, View } from "../components/Themed"
import { Shoppinglist } from "../logic/shoppinglist"
import { useShoppinglistStore } from "../logic/shoppinglist-repository"
import { RootStackScreenProps } from "../types"

export const CombineShoppinglistScreen = ({
    navigation,
    route: { params: { shoppinglistId } }
}: RootStackScreenProps<"CombineShoppinglist">) => {
    const shoppinglistStore = useShoppinglistStore()

    const shoppinglist = shoppinglistStore.get(shoppinglistId)
    
    const [currentView, setCurrentView] = React.useState(1)

    const [selectedShoppinglist, setSelectedShoppinglist] = React.useState<Shoppinglist | null>(null)

    const [selectedItems, setSelectedItems] = React.useState<number[]>([])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonArea}>
                    <FontAwesome name="arrow-left" style={styles.backArrow} onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Combine shoppinglist</Text>
                </View>
                <View style={{
                    flex: 1
                }}>

                </View>
            </View>
            <View style={{
                flexDirection: "column",
            }}>
                <View style={{marginBottom: 15, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <ProgressDot active={true} style={{ marginRight: 5 }} />
                    <ProgressDot active={currentView === 2 ? true : false} style={{ marginLeft: 5 }} />
                </View>
                <View>
                    <NiceLine />
                </View>
            </View>
            <View style={styles.main}>
                {currentView === 1 && shoppinglistStore.shoppinglists.filter(p => p.id != shoppinglistId && p.items.some(p => !p.completed)).map(p => (
                    <Pressable key={p.id} onPress={() => {
                        setSelectedShoppinglist(p)
                    }} style={{
                        backgroundColor: selectedShoppinglist?.id === p.id ? "#aadbf6" : undefined,
                        padding: 7
                    }}>
                        <Text style={{
                            fontSize: 20
                        }}>
                            {p.name}
                        </Text>
                    </Pressable>
                ))}
                {currentView === 2 && selectedShoppinglist?.items.map(p => (
                    <ShoppinglistRow
                        key={p.id}
                        name={p.name}
                        checked={selectedItems.some(e => e === p.id)}
                        onCheck={s => {
                            if (s) {
                                setSelectedItems([
                                    ...selectedItems,
                                    p.id
                                ])
                            } else {
                                setSelectedItems(selectedItems.filter(e => e !== p.id))
                            }
                           
                        }}
                    />
                ))}
            </View>
            <View style={styles.footer}>
                <View style={styles.backButton}>
                    {currentView > 1 &&
                    <Button title="Back" onPress={() => {
                        if (currentView > 1) {
                            setCurrentView(currentView - 1)
                        }
                    }} />}
                </View>
                <View style={styles.nextButton}>
                    {currentView < 2 &&
                    <Button title="Next" disabled={selectedShoppinglist != null ? false : true} onPress={() => {
                        if (currentView < 2) {
                            setCurrentView(currentView + 1)
                        }
                    }} />}
                    {currentView === 2 && 
                    <Button title="Combine" onPress={() => {
                        if (selectedShoppinglist) {
                            for (const item of selectedShoppinglist?.items.filter(p => selectedItems.some(e => e === p.id))) {
                                shoppinglist?.addItem(item.clone())
                            }
                        }

                        navigation.navigate("Shoppinglist", {
                            shoppinglistId: shoppinglistId
                        })
                    }} />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    header: {
        flexDirection: "row",
        paddingTop: 30,
        marginBottom: 20
    },
    main: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        flex: 1
    },
    footer: {
        flexDirection: "row",
        padding: 20
    },
    backButtonArea: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    },
    backArrow: {
        fontSize: 30
    },
    titleArea: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25
    },
    nextButton: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2
    },
    backButton: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2
    }
})