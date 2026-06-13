import { ProductType } from "../models/product-type";

export function getProductTypeDisplay(type: ProductType): string {
  switch (type) {
    case ProductType.FLOWER: return 'Flower';
    case ProductType.BOUQUET: return 'Bouquet';
    case ProductType.PLANT: return 'Plant';
    case ProductType.POT: return 'Pot';
    case ProductType.ACCESSORY: return 'Accessory';
    default: return type;
  }
}