import { autorun, makeAutoObservable } from "mobx"
import React from "react";
import { Shoppinglist } from "./shoppinglist"

let nextId = 0;

export class ShoppinglistRepository {
    public shoppinglists: Shoppinglist[] 

    constructor() {
        this.shoppinglists = []

        makeAutoObservable(this)    
    }

    public createShoppinglist(): Shoppinglist {
        const newShoppinglist = new Shoppinglist({
            id: nextId++
        })

        this.shoppinglists.push(newShoppinglist)

        return newShoppinglist
    }

    public removeShoppinglist(shoppinglist: Shoppinglist) {
        this.shoppinglists = this.shoppinglists.filter(p => p.id !== shoppinglist.id)
    }
}



const shoppinglistStore = new ShoppinglistRepository()

const ShoppinglistStoreContext = React.createContext(shoppinglistStore)
export const useShoppinglistStore = () => React.useContext(ShoppinglistStoreContext);

autorun(() => {
    console.log("storeshoppinglist store shoppinglists ", shoppinglistStore.shoppinglists.length)  
})