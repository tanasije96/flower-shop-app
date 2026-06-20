import { OrderStatus } from "../models/order-status";

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
}