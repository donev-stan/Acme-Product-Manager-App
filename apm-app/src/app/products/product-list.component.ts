import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private _productService: ProductService) {}

  pageTitle: string = 'Product List';

  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  private _listFilter: string = '';

  products: IProduct[] = [];

  filteredProducts: IProduct[] = [];

  errorMessage: string = '';

  // productDataSubscription: Subscription | undefined;
  productDataSubscription!: Subscription;

  // Functions
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy)
    );
  }

  onReturnedRating(rating: number): void {
    this.pageTitle = `Product List: ${rating}`;
  }

  // Getters and setters
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  // Hooks
  ngOnInit(): void {
    this.productDataSubscription = this._productService
      .getProducts()
      .subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  ngOnDestroy(): void {
    this.productDataSubscription.unsubscribe();
  }
}
