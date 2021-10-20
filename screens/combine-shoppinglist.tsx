import * as React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "../components/Themed"
import { useShoppinglistStore } from "../logic/shoppinglist-repository"
import { RootStackScreenProps } from "../types"

export const CombineShoppinglistScreen = ({
    route: { params: { shoppinglistId } }
}: RootStackScreenProps<"CombineShoppinglist">) => {
    const shoppinglistStore = useShoppinglistStore()
    
    return (
        <View>
            <View>

            </View>
            <View>

            </View>
            <View>
                
            </View>
            {shoppinglistStore.shoppinglists.filter(p => p.id != shoppinglistId).map(p => (
                <View key={p.id}>
                    <Text>
                        {p.name}
                    </Text>
                </View>
            ))}
            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {

    },
    main: {

    },
    footer: {

    }
})