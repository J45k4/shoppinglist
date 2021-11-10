import { FontAwesome } from "@expo/vector-icons"
import * as React from "react"
import { StyleSheet, TextInput } from "react-native"
import { Button } from "react-native"
import { NiceLine } from "../components/nice-line"
import { SearchSelect } from "../components/search-select"
import { Text, View } from "../components/Themed"
import { useItemMetadata } from "../logic/item-name-store"
import { ShoppinglistItem } from "../logic/shoppinglist"
import { useShoppinglistStore } from "../logic/shoppinglist-repository"
import { RootStackScreenProps } from "../types"

export const AddNewItemScreen = ({ navigation, route: { params: { shoppinglistId } } }: RootStackScreenProps<"AddNewItem">) => {
    const shoppinglistStore = useShoppinglistStore();
    
    const shoppinglist = shoppinglistStore.shoppinglists.find(p => p.id === shoppinglistId)

    const itemMetadata = useItemMetadata()

    const [name, setName] = React.useState("")
    const [gategory, setGategory] = React.useState("")
    const [amount, setAmount] = React.useState(1)

    const [gategorySuggestions, setGategorySuggestions] = React.useState<string[]>([])
    const [nameSuggestions, setNameSuggestions] = React.useState<string[]>([])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonArea}>
                    <FontAwesome name="arrow-left" style={styles.backButton} onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Add item</Text>
                </View>
                <View style={{
                    flex: 1
                }}>

                </View>
            </View>
            <NiceLine />
            <View style={styles.main}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.formGroupText}>
                        Gategory
                    </Text>
                    <SearchSelect value={gategory} onChange={t => {
                        const sug = itemMetadata.seekGategory(t)

                        setGategorySuggestions(sug)

                        setGategory(t)
                    }} suggestions={gategorySuggestions} onSuggestionClicked={(s) => {
                        setGategory(s)
                        setGategorySuggestions([])
                    }} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.formGroupText}>
                        Name
                    </Text>
                    <SearchSelect value={name} onChange={t => {
                        const sug = itemMetadata.seekName(t)

                        setNameSuggestions(sug)

                        setName(t)
                    }}
                    suggestions={nameSuggestions}
                    onSuggestionClicked={s => {
                        setName(s)
                        setNameSuggestions([])
                    }}
                    />
                </View>
                <View>
                    <Text style={styles.formGroupText}>
                        Amount    
                    </Text>
                    <View style={styles.amountControls}>
                        <FontAwesome name="minus" style={styles.minusButton} onPress={() => {
                            if (amount > 1) {
                                setAmount(amount - 1)
                            }
                        }} />
                        <Text style={{
                            fontSize: 20,
                            margin: 5
                        }}>
                            {amount}
                        </Text>
                        <FontAwesome name="plus" style={styles.plusButton} onPress={() => {
                            setAmount(amount + 1)
                        }} />
                    </View>
                </View>             
            </View>
            <View style={styles.footer}>
                <Button title="Add new" disabled={!name ? true : false} onPress={() => {
                    const newShoppinglistItem = new ShoppinglistItem()

                    newShoppinglistItem.name = name.toLowerCase()
                    newShoppinglistItem.gategory = gategory.toLowerCase()
                    newShoppinglistItem.amount = amount

                    itemMetadata.addCategory(gategory)
                    itemMetadata.addName(name)

                    shoppinglist?.addItem(newShoppinglistItem)

                    navigation.navigate("Shoppinglist", {
                        shoppinglistId: shoppinglistId
                    })
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    header: {
        flexDirection: "row",
        paddingTop: 30,
        marginBottom: 20
    },
    main: {
        paddingTop: 60,
        marginLeft: 20,
        marginRight: 20,
        flex: 1
    },
    footer: {
        padding: 20
    },
    backButtonArea: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    },
    backButton: {
        fontSize: 25
    },
    titleArea: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 25
    },
    formGroupText: {
        fontSize: 20
    },
    formTextInput: {
        height: 30,
        fontSize: 20,
        borderColor: "#cbcbcb",
        borderWidth: 1
    },
    minusButton: {
        marginTop: 10,
        fontSize: 23,
        margin: 5
    },
    plusButton: {
        marginTop: 10,
        fontSize: 23,
        margin: 5
    },
    amountControls: {
        flexDirection: "row"
    }
})