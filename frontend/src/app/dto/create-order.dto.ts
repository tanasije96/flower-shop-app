import { CreateOrderItemDTO } from "./create-order-item.dto";

export interface CreateOrderDTO {
  items: CreateOrderItemDTO[];
}