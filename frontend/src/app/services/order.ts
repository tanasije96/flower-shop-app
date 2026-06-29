import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { BehaviorSubject, Observable} from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  private orders = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  createOrder(order: CreateOrderDTO): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  notifyOrdersUpdated(): void {
    this.orders.next([...this.orders.getValue()]);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, {
      status: status
    });
  }
}