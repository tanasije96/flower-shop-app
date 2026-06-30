import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { BehaviorSubject, Observable, tap} from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://flowerbelt.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  private orders = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  createOrder(order: CreateOrderDTO): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap(newOrder => {
        const current = this.orders.value;
        this.orders.next([...current, newOrder]);
        }
      )
    );
  }

  loadOrders() {
    this.http.get<Order[]>(this.apiUrl)
      .subscribe(data => this.orders.next(data));
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