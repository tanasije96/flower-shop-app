import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductType } from '../models/product-type';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://flowerbelt.onrender.com/api/products';

  private products = new BehaviorSubject<Product[] | null>(null);
  products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http.get<Product[]>(this.baseUrl)
      .subscribe(data => this.products.next(data));
  }

  // GET all
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // GET by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // POST 
  createProduct(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, dto);
  }

  // PUT
  updateProduct(id: number, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // GET enums
  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.baseUrl}/types`);
  }
}