import { OrderItem } from "./order-item";

export interface Order {
    id?: number,
    client: string,
    itens: OrderItem[],
    subtotal: number,
    deliveryFee: number,
    taxes: number
}