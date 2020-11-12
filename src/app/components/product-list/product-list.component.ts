import { HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

import { ProductService } from 'src/app/services/product.service';
import { Iten } from 'src/app/shared/models/iten.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  selectItens: Iten[] = [];
  totalItens = 0;
  totalPromos = 0;
  totalPayable = 0;

  constructor(
    private productService: ProductService,
    private checkoutService: CheckoutService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.findOnlyProducts().subscribe((response: Product[]) => {
      this.products = response;
    });
  }

  addIten(product): void {
    if (this.checkIten(product)){
      const findIten = this.checkIten(product);
      findIten.quantity ++;
      this.refreshIten(findIten);
    } else {
      const iten = new Iten(product, 1, 0, 0);
      this.selectItens.push(iten);
      const findIten = this.checkIten(iten.product);
      this.refreshIten(findIten);
    }
  }

  removeIten(product: any): void {
    this.selectItens.splice(this.selectItens.indexOf(this.checkIten(product)), 1);
    this.checkout();
  }
  minusIten(iten: Iten): void {
    const itenFind = this.checkIten(iten.product);
    itenFind.quantity --;
    this.refreshIten(itenFind);
    this.checkout();
    if ( itenFind.quantity <= 0) {
      this.removeIten(iten.product);
    }
  }

  checkIten(product: Product): Iten {
    const itenFound = this.selectItens.find((p: Iten) => p.product.id === product.id);
    return itenFound;
  }

  refreshIten(iten: Iten): void {
    iten.getVrTotal();
    this.checkoutService.aplayPromotions(iten);
    setTimeout(() => {
      this.checkout();
    }, 1000);
  }

  checkout(): void {
    this.totalItens = 0;
    this.totalPromos = 0;
    this.totalPayable = 0;
    for (const iten of this.selectItens) {
      this.totalItens += (iten.vrTotal / 100);
      this.totalPromos +=  ((iten.vrTotal - iten.vrFinal)  / 100);
      this.totalPayable +=  (iten.vrFinal  / 100);
    }
  }

}
