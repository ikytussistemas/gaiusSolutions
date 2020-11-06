import { Component, OnInit } from '@angular/core';

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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.findAll().subscribe(response => {
      this.products = response;
    });
  }

  addIten(product) {
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
    this.checkout();
  }

  removeIten(product: any) {
    this.selectItens.splice(this.selectItens.indexOf(this.checkIten(product)), 1);
    this.checkout();
  }
  minusIten(iten: Iten) {
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

  refreshIten(iten: Iten) {
    iten.getVrTotal();
    iten.aplayPromotions();
  }

  checkout() {
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
