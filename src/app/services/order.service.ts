import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { Product } from '../model/product';
import { Option } from '../model/option';
import { OptionsList } from '../model/options-list';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  sendOrder() {
    console.log('Order sent', JSON.parse(this.createOrderIfDoesntExist()));
    localStorage.clear();
  }

  emptyBag() {
    localStorage.clear();
  }

  createOrderIfDoesntExist(): string {
    if (!(localStorage.getItem('order') ?? '').length) {
      const order: Order = {
        client: 'Anônimo',
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        taxes: 0
      };

      localStorage.setItem('order', JSON.stringify(order));
    }

    return localStorage.getItem('order') ?? '';
  }

  createItemIfDoesntExist(product: Product) {
    if (!(localStorage.getItem('item')??'').length) {
      const item: OrderItem = {
        product: {...product, optionsLists: undefined},
        quantity: 1,
        price: product.promoPrice ? product.promoPrice : product.price
      };

      localStorage.setItem('item', JSON.stringify(item));
    }

    return localStorage.getItem('item')??'';
  }

  addItemToOrder() {
    const order = JSON.parse(this.createOrderIfDoesntExist()) as Order;
    const item = JSON.parse(localStorage.getItem('item')??'');

    console.log('order: ', order);
    
    order.items.push(item);
    order.subtotal += item.price;

    localStorage.setItem('order', JSON.stringify(order));
    localStorage.removeItem('item');
  }

  addNotesToItem(notes: string) {
    const item = JSON.parse(localStorage.getItem('item')??'') as OrderItem;
    item.notes = notes;
    localStorage.setItem('item', JSON.stringify(item));
  }

  updateItem(newItem: OrderItem, index: number) {
    const order = JSON.parse(localStorage.getItem('order')??'') as Order;
    order.items[index] = newItem;
    this.updateSubtotal(order)
    localStorage.setItem('order', JSON.stringify(order)); 
  }

  deleteItem(index: number) {
    if (index >= 0) {
      const order = JSON.parse(localStorage.getItem('order')??'') as Order;
      order.items.splice(index, 1);
      this.updateSubtotal(order);
      localStorage.setItem('order', JSON.stringify(order));
    }
  }

  deleteItemWithoutContext({ index, service }: { index: number, service: OrderService }) {   
    if (index >= 0) {
      const order = JSON.parse(localStorage.getItem('order')??'') as Order;
      order.items.splice(index, 1);
      service.updateSubtotal(order);
      localStorage.setItem('order', JSON.stringify(order));
    }
  }

  private updateSubtotal(order: Order) {
    let price = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    order.taxes = price * 0.02;
    order.subtotal = price;
  }

  private createOptionListIfDoesntExist(optionsLists: OptionsList[], optionsListName: string): OptionsList[] {
    if (optionsLists.find(list => list.name == optionsListName) == undefined) {
      const newList: OptionsList = {
        name: optionsListName,
        options: []
      };

      optionsLists.push(newList);
    }

    return optionsLists;
  }

  addOptionToProductItem(option: Option) {
    const item = JSON.parse(localStorage.getItem('item')??'') as OrderItem;
    const listName = option.optionsListName??'Opcional';

    item.optionsLists = this.createOptionListIfDoesntExist(item.optionsLists??[], listName);

    delete option.imageName;
    delete option.optionsListName;

    const list = item.optionsLists.find(list => list.name == listName) ?? {} as OptionsList;
    const olderOptionIndex = list.options.findIndex(opt => opt.name == option.name);

    // Remove option and parents that are empty
    if (!option.quantity) { 
      this.deleteOption(list, olderOptionIndex);
      item.price -= option.price;

      if (!list.options.length) {
        this.deleteList(item.optionsLists, listName);

        if (!item.optionsLists.length)
          delete item.optionsLists;
      } 
    }
    // Option already exists; Update option quantity
    else if (olderOptionIndex != -1) {
      this.updateItemPrice(item, list.options[olderOptionIndex], option);
      list.options[olderOptionIndex].quantity = option.quantity;
    }
    // Option does not exist; Add new option
    else {
      list?.options.push(option); 
      item.price += option.price;
    }

    localStorage.setItem('item', JSON.stringify(item));
  }

  private updateItemPrice(item: OrderItem, oldOption: Option, newOption: Option) {
    item.price -= oldOption.price * (oldOption.quantity ?? 0);
    item.price += newOption.price * (newOption.quantity ?? 0);
  }

  private deleteList(optionsLists: OptionsList[], listName: string) {
    const index = optionsLists.findIndex(list => list.name == listName);
    if (index != -1) 
      optionsLists.splice(index, 1);
  }

  private deleteOption(list: OptionsList, optionIndex: number = list.options.length - 1) {
    list.options.splice(optionIndex, 1);
  }

  getOrder() {
    return JSON.parse(this.createOrderIfDoesntExist());
  }

}
