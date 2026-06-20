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

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatButtonModule,
    MatIconModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'type', 'actions'];
  loading = true;
  error = '';

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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

  buyProduct(product: Product): void {
    this.snackBar.open(
      `You've successfully purchased ${product.name}!`,
      'Close',
      { duration: 3000 }
    );
  }
}
