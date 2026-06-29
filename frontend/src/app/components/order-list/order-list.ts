import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderListComponent implements OnInit {

  get orders$() {
    return this.orderService.orders$;
  }
  displayedColumns: string[] = [
    'id',
    'totalPrice',
    'totalItems',
    'status',
    'createdAt',
    'actions'
  ];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.loadOrders();
  }

  getDisplayStatus(status: string): string {
    return status.replace('_', ' ');
  }

  viewOrder(order: Order): void {
    console.log('Viewing order:', order);

    // later: route to order details page
  }
}