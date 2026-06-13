import { ProductType } from '../models/product-type';

export interface UpdateProductDTO {
  name: string;
  price: number;
  imageUrl?: string;
  type: ProductType;
}