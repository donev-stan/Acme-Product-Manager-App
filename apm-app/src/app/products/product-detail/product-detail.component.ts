import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  product: IProduct | undefined;

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.params['id']);
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
