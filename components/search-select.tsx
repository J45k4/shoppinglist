import * as React from "react"
import { Pressable, TextInput } from "react-native"
import { Text, View } from "./Themed"

export const SearchSelect = (props: {
    value: string
    suggestions?: string[]
    onChange?: (text: string) => void
    onSuggestionClicked?: (suggestion: string) => void
}) => {
    return (
        <View style={{
            flexDirection: "column"
        }}>
            <TextInput style={{
                height: 30,
                fontSize: 20,
                borderColor: "#cbcbcb",
                borderWidth: 1
            }} value={props.value} onChangeText={props.onChange} />
            <View style={{
                backgroundColor: "white"
            }}>
                {props.suggestions?.slice(0, 6).map(p => (
                    <Pressable key={p} onPress={() => {
                        if (props.onSuggestionClicked) {
                            props.onSuggestionClicked(p)
                        }
                    }}>
                        <Text style={{
                            fontSize: 20
                        }}>
                            {p}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}