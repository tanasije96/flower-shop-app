import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrderItemDTO } from '../../dto/create-order-item.dto';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  get items$() {
    return this.cartService.items$;
  }

  get totalItems$() {
    return this.cartService.totalItems$;
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  checkout(): void {
    let items: CreateOrderItemDTO[] = [];

    this.items$.subscribe(value => items = value).unsubscribe();

    if (items.length === 0) {
      this.snackBar.open('Cart is empty!', 'Close', { duration: 2000 });
      return;
    }

    this.orderService.createOrder({ items }).subscribe({
      next: () => {
        this.cartService.clear();

        this.orderService.notifyOrdersUpdated();

        this.snackBar.open('Order successfully created!', 'Close', {
          duration: 3000
        });
      },
      error: () => {
        this.snackBar.open('Order failed', 'Close', { duration: 3000 });
      }
    });
  }
}