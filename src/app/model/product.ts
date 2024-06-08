import { OptionsList } from "./options-list";

export interface Product {
    id?: number,
    name: string,
    description: string,
    price: number,
    promoPrice?: number,
    optionsLists?: OptionsList[];
}