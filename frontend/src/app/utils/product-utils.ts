import { ProductType } from "../models/product-type";

const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  FLOWER: 'Flower',
  BOUQUET: 'Bouquet',
  PLANT: 'Plant',
  POT: 'Pot',
  ACCESSORY: 'Accessory'
};

export function getProductTypeDisplay(type: ProductType): string {
  return PRODUCT_TYPE_LABELS[type];
}