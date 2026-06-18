import { OrderStatus } from './order-status';
import { OrderItem } from './order-item';

export interface Order {
  id: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string; 
  items: OrderItem[];
  totalItems: number;
}