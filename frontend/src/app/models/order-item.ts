export interface OrderItem {
  readonly id: number;
  readonly productId: number;
  readonly productName: string;
  readonly quantity: number;
  readonly priceAtPurchase: number;
}