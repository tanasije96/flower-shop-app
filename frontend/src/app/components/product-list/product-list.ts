import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { getProductTypeDisplay } from '../../utils/product-utils';
import { ProductType } from '../../models/product-type';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderListComponent } from '../order-list/order-list';
import {MatCardModule} from '@angular/material/card';
import { CartComponent } from "../cart/cart";
import { CartService } from '../../services/cart';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatButtonModule,
    MatIconModule, OrderListComponent, MatCardModule, CartComponent, MatProgressSpinnerModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  get products$() {
    return this.productService.products$;
  }
  displayedColumns: string[] = ['image', 'name', 'price', 'type', 'actions'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  getDisplayType(type: ProductType): string {
    return getProductTypeDisplay(type);
  }

  buyProduct(product: Product): void {
    this.cartService.addItem(product.id);

    this.snackBar.open(
      `${product.name} added to cart!`,
      'Close',
      { duration: 2000 }
    );
  }
}
