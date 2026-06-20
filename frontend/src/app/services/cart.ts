import { Injectable } from '@angular/core';
import { CreateOrderItemDTO } from '../dto/create-order-item.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CreateOrderItemDTO[] = [];

  getItems(): CreateOrderItemDTO[] {
    return this.items;
  }

  addItem(productId: number): void {
    const existing = this.items.find(i => i.productId === productId);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ productId, quantity: 1 });
    }
  }

  clear(): void {
    this.items = [];
  }

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}