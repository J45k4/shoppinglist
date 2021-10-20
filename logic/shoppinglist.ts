import { makeAutoObservable } from "mobx";

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
        shoppinglistItem.id = this.nextShoppinglistItemId++
        this.items.push(shoppinglistItem)
    }
}