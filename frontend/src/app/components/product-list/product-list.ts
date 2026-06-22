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
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { OrderListComponent } from '../order-list/order-list';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatButtonModule,
    MatIconModule, OrderListComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'type', 'actions'];
  loading = true;
  error = '';
  cartCount: number = 0;

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.updateCartCount();
  }

  loadProducts(): void {
    console.log('Calling backend...');

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('DATA RECEIVED:', data);

        this.products = data;
        this.loading = false;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.log('ERROR:', err);

        this.error = 'Failed to load products';
        this.loading = false;

        this.cd.detectChanges();
      }
    });
  }
  getDisplayType(type: ProductType): string {
    return getProductTypeDisplay(type);
  }

  updateCartCount(): void {
    this.cartCount = this.cartService.getTotalItems();
  }

  buyProduct(product: Product): void {
    this.cartService.addItem(product.id);
    this.updateCartCount();

    this.snackBar.open(
      `${product.name} added to cart!`,
      'Close',
      { duration: 2000 }
    );
  }

  checkout(): void {
    const items = this.cartService.getItems();

    if (items.length === 0) {
      this.snackBar.open('Cart is empty!', 'Close', { duration: 2000 });
      return;
    }

    const order = {
      items: items
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clear();
        this.updateCartCount();

        this.cd.detectChanges();

        this.snackBar.open(
          'Order successfully created!',
          'Close',
          { duration: 3000 }
        );

        this.orderService.notifyOrdersUpdated();

        console.log('Order created successfully');
      },
      error: (err) => {
        console.error('Order failed:', err);

        this.snackBar.open(
          'Failed to create order',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }
  
}
