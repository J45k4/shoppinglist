import { FontAwesome } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { NiceLine } from '../components/nice-line';
import { ShoppinglistTable } from '../components/shoppinglist-table';

import { Text, View } from "../components/Themed";
import { useShoppinglistStore } from '../logic/shoppinglist-repository';
import { RootStackScreenProps, RootTabScreenProps } from '../types';

export const ShoppingListScreen = observer(({ navigation, route: { params: { shoppinglistId } } }: RootStackScreenProps<"Shoppinglist">) => {
    console.log("lol", shoppinglistId)
    const shoppinglistStore = useShoppinglistStore();

    const shoppinglist = shoppinglistStore.shoppinglists.find(p => p.id == shoppinglistId)

    const [editingName, setEditingName] = React.useState(false)
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonArea}>
                    <FontAwesome name="arrow-left" style={styles.backButton} onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={styles.titleArea}>
                    {!editingName &&
                    <Text style={styles.title} onPress={() => {
                        setEditingName(true)
                    }}>
                        {shoppinglist?.name}
                    </Text>}
                    {editingName && 
                    <TextInput autoFocus={true} placeholder="Name" style={styles.titleEditInput} value={shoppinglist?.name} onChangeText={text => {
                        if (shoppinglist) {
                            shoppinglist.setName(text)
                        }
                    }} onBlur={() => {
                        setEditingName(false)
                    }} />}
                </View>
                <View style={styles.shareArea}>
                    <FontAwesome name="share-alt" style={styles.shareButton} />
                </View>
            </View>
            <NiceLine />
            <View style={styles.main}>
                {shoppinglist &&
                <ShoppinglistTable shoppinglist={shoppinglist} />}
            </View>
            <View style={styles.footer}>
                <View style={styles.combineButton}>
                    <Button title="Combine shoppinglist" onPress={() => {
                        navigation.navigate("CombineShoppinglist", {
                            shoppinglistId: shoppinglistId
                        })
                    }} />
                </View>
                <View style={styles.addNewButton}>
                    <Button title="Add item" onPress={() => {
                        navigation.navigate("AddNewItem", {
                            shoppinglistId: shoppinglistId
                        })
                    }} />
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        paddingTop: 30,
        marginBottom: 20
    },
    main: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40
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
    backButton: {
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
    titleEditInput: {
        fontSize: 25,
        flex: 1,
        textAlign: "center",
        width: "100%"
    },
    shareArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    shareButton: {
        fontSize: 30
    },
    addNewButton: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2
    },
    combineButton: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2
    }
})