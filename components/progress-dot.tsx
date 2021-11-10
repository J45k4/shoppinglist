import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

export const ProgressDot = (props: {
    active: boolean,
    style?: StyleProp<ViewStyle>
}) => {
    return (
        <View style={
            [props.style, {
                borderRadius: 7, 
                width: 7, 
                height: 7, 
                backgroundColor: props.active ? "#96cdff" : "white", 
                borderColor: "black", borderWidth: 0.2}]
            } />
    )
}