import { OrderOptionsList } from "./order-options-list";
import { Product } from "./product";

export interface OrderItem {
    id?: number,
    client?: string,
    product: Product,
    quantity: number,
    orderOptionsLists?: OrderOptionsList[],
    notes?: string,
    price: number
}