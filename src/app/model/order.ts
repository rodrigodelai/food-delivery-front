import { OrderItem } from "./order-item";

export interface Order {
    id?: number,
    client: string,
    items: OrderItem[],
    subtotal: number,
    deliveryFee: number,
    taxes: number
}