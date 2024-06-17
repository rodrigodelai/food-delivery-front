import { OrderOption } from "./order-option";

export interface OrderOptionsList {
    id?: number,
    name: string,
    orderOptions: OrderOption[]
}