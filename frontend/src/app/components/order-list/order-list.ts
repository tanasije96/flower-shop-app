import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule
  ],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  displayedColumns: string[] = [
    'id',
    'totalPrice',
    'totalItems',
    'status',
    'createdAt',
    'actions'
  ];

  loading = true;
  error = '';

  constructor(
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();

    this.orderService.refreshOrders$.subscribe(() => {
      this.loadOrders();
    });
  }

  loadOrders(): void {
    console.log('Loading orders...');

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log('ORDERS RECEIVED:', data);

        this.orders = data;
        this.loading = false;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('ERROR:', err);

        this.error = 'Failed to load orders';
        this.loading = false;

        this.cd.detectChanges();

        this.snackBar.open(
          'Failed to load orders',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  getDisplayStatus(status: string): string {
    return status.replace('_', ' ');
  }

  viewOrder(order: Order): void {
    console.log('Viewing order:', order);

    // later: route to order details page
  }
}