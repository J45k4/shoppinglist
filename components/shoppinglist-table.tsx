import { FontAwesome } from "@expo/vector-icons"
import { observer } from "mobx-react/node_modules/mobx-react-lite"
import * as React from "react"
import { Shoppinglist } from "../logic/shoppinglist"
import { ShoppinglistGroup } from "./shoppinglist-group"
import { Text, View } from "./Themed"



export const ShoppinglistTable = observer((props: {
    shoppinglist: Shoppinglist
}) => {
    const [open, setOpen] = React.useState(false)
    const [completedOpen, setCompletedOpen] = React.useState(false)

    return (
        <View style={{
        
        }}>
            <ShoppinglistGroup groupName="Food" open={open}
                openChanged={setOpen}
            items={props.shoppinglist.items.filter(p => !p.completed)} />
            <ShoppinglistGroup groupName="Completed" 
                open={completedOpen}
                openChanged={setCompletedOpen}
                items={props.shoppinglist.items.filter(p => p.completed)} />
        </View>
    )
})