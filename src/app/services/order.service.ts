import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { Product } from '../model/product';
import { Option } from '../model/option';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { OrderOptionsList } from '../model/order-options-list';
import { OrderOption } from '../model/order-option';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends CrudService<Order> {

  private order: Order;

  constructor(http: HttpClient) {
    super(http, 'order');
    this.order = JSON.parse(this.createOrderIfDoesntExist());
  }

  sendOrder() {
    return this.create(this.order);
  }

  emptyBag() {
    localStorage.removeItem('item');
    localStorage.removeItem('order');
    this.order = JSON.parse(this.createOrderIfDoesntExist());
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

    return localStorage.getItem('item') ?? '';
  }

  addItemToOrder() {
    //const order = JSON.parse(this.createOrderIfDoesntExist()) as Order;
    const item = JSON.parse(localStorage.getItem('item') ?? '') as OrderItem;
    
    this.order.items.push(item);
    this.order.subtotal += item.price;

    localStorage.setItem('order', JSON.stringify(this.order));
    localStorage.removeItem('item');
  }

  addNotesToItem(notes: string) {
    const item = JSON.parse(localStorage.getItem('item') ?? '') as OrderItem;
    item.notes = notes;
    localStorage.setItem('item', JSON.stringify(item));
  }

  updateItem(newItem: OrderItem, index: number) {
    // const order = JSON.parse(localStorage.getItem('order') ?? '') as Order;

    this.order.items[index] = newItem;
    this.updateSubtotal(this.order)
    localStorage.setItem('order', JSON.stringify(this.order)); 
  }

  deleteItem(index: number) {
    if (index >= 0) {
      // const order = JSON.parse(localStorage.getItem('order')??'') as Order;

      this.order.items.splice(index, 1);
      this.updateSubtotal(this.order);
      localStorage.setItem('order', JSON.stringify(this.order));
    }
  }

  deleteItemWithoutContext({ index, service }: { index: number, service: OrderService }) {   
    if (index >= 0) {
      // const order = JSON.parse(localStorage.getItem('order')??'') as Order;

      this.order.items.splice(index, 1);
      service.updateSubtotal(this.order);
      localStorage.setItem('order', JSON.stringify(this.order));
    }
  }

  private updateSubtotal(order: Order) {
    let price = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    order.taxes = price * 0.02;
    order.subtotal = price;
  }

  private addOrderOptionsListIfNotExists(orderOptionsLists: OrderOptionsList[], optionsListName: string): OrderOptionsList[] {
    if (orderOptionsLists.find(list => list.name == optionsListName) == undefined) {
      const newList: OrderOptionsList = {
        name: optionsListName,
        orderOptions: []
      };

      orderOptionsLists.push(newList);
    }

    return orderOptionsLists;
  }

  addOrderOptionToOrderItem(option: Option) {
    const item = JSON.parse(localStorage.getItem('item') ?? '') as OrderItem;
    const listName = option.optionsListName ?? 'Opcional';

    item.orderOptionsLists = this.addOrderOptionsListIfNotExists(item.orderOptionsLists ?? [], listName);

    delete option.imageName;
    delete option.optionsListName;

    const list = item.orderOptionsLists.find(list => list.name == listName) ?? {} as OrderOptionsList;
    const olderOrderOptionIndex = list.orderOptions.findIndex(orderOption => orderOption.option.name == option.name);

    // Remove orderOptions and parents that are empty
    if (!option.quantity) { 
      this.deleteOrderOption(list, olderOrderOptionIndex);
      item.price -= option.price;

      if (!list.orderOptions.length) {
        this.deleteList(item.orderOptionsLists, listName);

        if (!item.orderOptionsLists.length)
          delete item.orderOptionsLists;
      } 
    }
    // OrderOption already exists; Update orderOption quantity
    else if (olderOrderOptionIndex != -1) {
      this.updateItemPrice(item, list.orderOptions[olderOrderOptionIndex], option);
      list.orderOptions[olderOrderOptionIndex].quantity = option.quantity;
    }
    // OrderOption does not exist; Add new orderOption
    else {
      const newOrderOption = {
        option: option,
        quantity: option.quantity
      }

      delete option.quantity;

      list?.orderOptions.push(newOrderOption); 
      item.price += option.price;
    }

    localStorage.setItem('item', JSON.stringify(item));
  }

  private updateItemPrice(item: OrderItem, oldOrderOption: OrderOption, newOption: Option) {
    item.price -= oldOrderOption.option.price * (oldOrderOption.quantity ?? 0);
    item.price += newOption.price * (newOption.quantity ?? 0);
  }

  private deleteList(orderOptionsLists: OrderOptionsList[], listName: string) {
    const index = orderOptionsLists.findIndex(list => list.name == listName);
    if (index != -1) 
      orderOptionsLists.splice(index, 1);
  }

  private deleteOrderOption(list: OrderOptionsList, orderOptionIndex: number = list.orderOptions.length - 1) {
    list.orderOptions.splice(orderOptionIndex, 1);
  }

  getOrder() {
    return this.order;
  }

}
