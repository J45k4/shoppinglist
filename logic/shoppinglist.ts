import { makeAutoObservable } from "mobx";
import { useShoppinglistStore } from "./shoppinglist-repository";

export class ShoppinglistItem {
    public id: number = 0
    public name: string = ""
    public gategory: string = ""
    public amount: number = 0
    public completed: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    public increaseAmount() {
        this.amount++
    }

    public decreaseAmount() {
        if (this.amount === 0) {
            return
        }

        this.amount--
    }

    public complete() {
        this.completed = true
    }

    public uncomplete() {
        this.completed = false
    }

    public clone() {
        const shoppinglistItem = new ShoppinglistItem()

        shoppinglistItem.name = this.name
        shoppinglistItem.gategory = this.gategory
        shoppinglistItem.amount = this.amount
        shoppinglistItem.completed = this.completed

        return shoppinglistItem
    }
}

export class Shoppinglist {
    public readonly id: number
    public name: string = "New shoppinglist"
    public nextShoppinglistItemId: number = 1
    public items: ShoppinglistItem[] = []

    constructor(props: {
        id: number
    }) {
        this.id = props.id

        makeAutoObservable(this)
    }

    public setName(n: string) {
        this.name = n
    }

    public addItem(shoppinglistItem: ShoppinglistItem) {
        if (this.items.some(p => p.id === shoppinglistItem.id)) {
            return
        }

        shoppinglistItem.id = this.nextShoppinglistItemId++
        this.items.push(shoppinglistItem)
    }

    public countCategories() {
        const s = new Set()

        for (const item of this.items) {
            if (item.gategory && !s.has(item.gategory)) {
                s.add(item.gategory)
            }
        }

        return s.size
    }

    public getGroupedItemsByGategory() {
        const items = new Map()

        for (const item of this.items) {

        }
    }

    public getCategories() {
        const s = new Set<string>()

        for (const item of this.items) {
            if (item.gategory && !s.has(item.gategory)) {
                s.add(item.gategory)
            }
        }

        return Array.from(s)
    }

    public removeItem(id: number) {
        this.items = this.items.filter(p => p.id !== id)
    }

    public countItems() {
        return this.items.length
    }

    public countCompletedItems() {
        return this.items.filter(p => p.completed).length
    }
}

export const useShoppinglist = (id: number) => {
    const store = useShoppinglistStore()

    return store.get(id)
}