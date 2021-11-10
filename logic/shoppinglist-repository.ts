import { autorun, makeAutoObservable } from "mobx"
import React from "react";
import { Shoppinglist } from "./shoppinglist"
import { makePersistable } from "mobx-persist-store"
import localforage from "localforage";

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

    public get(id: number) {
        return this.shoppinglists.find(p => p.id === id)
    }
}

const shoppinglistStore = new ShoppinglistRepository()

const ShoppinglistStoreContext = React.createContext(shoppinglistStore)
export const useShoppinglistStore = () => React.useContext(ShoppinglistStoreContext);