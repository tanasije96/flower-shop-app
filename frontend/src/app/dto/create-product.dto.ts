import { ProductType } from '../models/product-type';

export interface CreateProductDTO {
  name: string;
  price: number;
  imageUrl?: string; 
  type: ProductType;
}