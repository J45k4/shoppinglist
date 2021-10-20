import { FontAwesome } from "@expo/vector-icons"
import * as React from "react"
import { StyleSheet } from "react-native"
import { Button } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Text, View } from "../components/Themed"
import { ShoppinglistItem } from "../logic/shoppinglist"
import { useShoppinglistStore } from "../logic/shoppinglist-repository"
import { RootStackScreenProps } from "../types"

export const AddNewItemScreen = ({ navigation, route: { params: { shoppinglistId } } }: RootStackScreenProps<"AddNewItem">) => {
    const shoppinglistStore = useShoppinglistStore();
    
    const shoppinglist = shoppinglistStore.shoppinglists.find(p => p.id === shoppinglistId)

    const [name, setName] = React.useState("")

    return (
        <View>
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
            <View style={styles.main}>
                <Text style={styles.formGroupText}>
                    Gategory
                </Text>
                <TextInput style={styles.formTextInput} />
                <Text style={styles.formGroupText}>
                    Name
                </Text>
                <TextInput style={styles.formTextInput} value={name} onChangeText={text => {
                    setName(text)
                }} />
                <Button title="Add new" onPress={() => {
                    const newShoppinglistItem = new ShoppinglistItem()

                    newShoppinglistItem.name = name

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
        
    },
    header: {
        flexDirection: "row"
    },
    main: {
        marginLeft: 20,
        marginRight: 20
    },
    backButtonArea: {
        flex: 1, 
        backgroundColor: "#ab5c69",
        alignItems: "center", 
        justifyContent: "center"
    },
    backButton: {
        color: "white",
        fontSize: 30
    },
    titleArea: {
        flex: 3,
        backgroundColor: "#4a2128",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 40
    },
    formGroupText: {
        fontSize: 30
    },
    formTextInput: {
        height: 30,
        color: "white"
    }
})