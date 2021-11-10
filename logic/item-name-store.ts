import { makeAutoObservable } from "mobx"
import React from "react"

export class ItemNameStore {
    private gategories: Set<string> = new Set()
    private names: Set<string> = new Set()

    constructor() {
        makeAutoObservable(this)
    }

    public addCategory(gategory: string) {
        this.gategories.add(gategory.toLowerCase())
    }

    public addName(name: string) {
        this.names.add(name.toLowerCase())
    }

    public seekGategory(g: string) {
        const gategories = []

        if (g) {
            const lowerG = g.toLowerCase()

            for (const ga of this.gategories) {
                if (ga.toLocaleLowerCase().includes(lowerG)) {
                    gategories.push(ga)
                }
            }
        }

        return gategories
    }

    public seekName(n: string) {
        const names = []

        if (n) {
            const lowerN = n.toLowerCase()

            for (const na of this.names) {
                if (na.toLowerCase().includes(lowerN)) {
                    names.push(na)
                }
            }
        }

        return names
    }
}

const itemNameStore = new ItemNameStore()

const ItemNameStoreContext = React.createContext(itemNameStore)
export const useItemMetadata = () => React.useContext(ItemNameStoreContext);