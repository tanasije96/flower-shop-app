import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CreateOrderItemDTO } from '../dto/create-order-item.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private items = new BehaviorSubject<CreateOrderItemDTO[]>([]);
  items$ = this.items.asObservable();

  totalItems$ = this.items$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  getItems(): CreateOrderItemDTO[] {
    return this.items.getValue();
  }

  addItem(productId: number): void {
    const existing = this.items.getValue().find(i => i.productId === productId);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.next([...this.items.getValue(), { productId, quantity: 1 }]);
    }
  }

  clear(): void {
    this.items.next([]);
  }

  getTotalItems(): number {
    return this.items.getValue().reduce((sum, item) => sum + item.quantity, 0);
  }

  removeItem(productId: number): void {
    const existing = this.items.getValue().find(i => i.productId === productId);

    if (!existing) return;

    existing.quantity--;

    if (existing.quantity <= 0) {
      this.items.next(this.items.getValue().filter(i => i.productId !== productId));
    }
  }
}