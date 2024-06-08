import { OptionsList } from "./options-list";
import { Product } from "./product";

export interface OrderItem {
    id?: number,
    product: Product,
    quantity: number,
    optionsLists?: OptionsList[],
    notes?: string,
    price: number
}