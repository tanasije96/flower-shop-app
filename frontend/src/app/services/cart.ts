import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CreateOrderItemDTO } from '../dto/create-order-item.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CreateOrderItemDTO[] = [];

  private itemsSubject = new BehaviorSubject<CreateOrderItemDTO[]>([]);
  items$ = this.itemsSubject.asObservable();

  totalItems$ = this.items$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0))
  );

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

    this.emitChanges();
  }

  clear(): void {
    this.items = [];
    this.emitChanges();
  }

  private emitChanges(): void {
    this.itemsSubject.next([...this.items]); 
  }

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  removeItem(productId: number): void {
    const existing = this.items.find(i => i.productId === productId);

    if (!existing) return;

    existing.quantity--;

    if (existing.quantity <= 0) {
      this.items = this.items.filter(i => i.productId !== productId);
    }

    this.emitChanges();
  }
}