import { FontAwesome } from "@expo/vector-icons"
import { observer } from "mobx-react"
import * as React from "react"
import { Shoppinglist } from "../logic/shoppinglist"
import { ShoppinglistGroup } from "./shoppinglist-group"
import { ShoppinglistRow } from "./shoppinglist-row"
import { Text, View } from "./Themed"



export const ShoppinglistTable = observer((props: {
    shoppinglist: Shoppinglist
}) => {
    const [open, setOpen] = React.useState(false)
    const [completedOpen, setCompletedOpen] = React.useState(false)

    const completedItems = props.shoppinglist.items.filter(p => p.completed)

    const gategories = props.shoppinglist.getCategories()

    console.log("items", props.shoppinglist.items.filter(p => !p.gategory))

    return (
        <View style={{
        
        }}>
            {props.shoppinglist.items.filter(p => !p.completed && !p.gategory).map(p => (
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
                            props.shoppinglist.removeItem(p.id)
                        }
                    }}
                    onRemove={() => {
                        props.shoppinglist.removeItem(p.id)
                    }} />
            ))}

            {gategories.map(p => (
                <ShoppinglistGroup groupName={p} open={open}
                    openChanged={setOpen}
                    onRemove={id => {
                        props.shoppinglist.removeItem(id)
                    }}
                    items={props.shoppinglist.items.filter(e => !e.completed && e.gategory === p)} />
            ))}


            {completedItems.length > 0 && 
            <ShoppinglistGroup groupName="Completed" 
                open={completedOpen}
                openChanged={setCompletedOpen}
                onRemove={() => {}}
                items={props.shoppinglist.items.filter(p => p.completed)} />}
        </View>
    )
})