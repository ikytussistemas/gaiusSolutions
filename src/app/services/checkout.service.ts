import { Injectable } from '@angular/core';
import { Iten } from '../shared/models/iten.model';
import { Product } from '../shared/models/product.model';
import { Promotion } from '../shared/models/promotion-interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  iten: Iten;

  constructor(
    private productService: ProductService,
  ) { }

  aplayPromotions(iten: Iten): void {
    this.iten = iten;
    this.productService.findById(this.iten.product.id).subscribe((response: Product) => {
      this.iten.product = response;

      if (this.iten.product.promotions.length > 0) {
        for (const promotion of this.iten.product.promotions) {
          this.checkPromotion(promotion);
        }
      }
      else {
        this.iten.vrFinal = this.iten.product.price * this.iten.quantity;
      }
    });
  }

  checkPromotion(promotion: Promotion): void {
    switch (promotion.type) {
      case 'BUY_X_GET_Y_FREE':
        let promotionals = 0;
        let extra = 0;
        if ((this.iten.quantity > 1) && (this.iten.quantity % 2 === 0)) {
          promotionals = this.iten.quantity / 2;
          extra = 0;
        } else {
          promotionals = ((this.iten.quantity - 1) / 2);
          extra = 1;
        }
        this.iten.vrFinal = (promotionals + extra) * this.iten.product.price;
        break;
      case 'QTY_BASED_PRICE_OVERRIDE':
        let based = 0;
        let normal = 0;
        if ((this.iten.quantity > 1) && (this.iten.quantity % promotion.required_qty === 0)) {
          based = this.iten.quantity / 2;
          normal = 0;
        } else {
          based = ((this.iten.quantity - 1) / 2);
          normal = 1;
        }
        this.iten.vrFinal = (based * promotion.price) + (normal * this.iten.product.price);

        break;
      case 'FLAT_PERCENT':
        this.iten.vrFinal = ((this.iten.product.price - (this.iten.product.price * (promotion.amount / 100))) * this.iten.quantity);
        break;
      default:
        this.iten.vrFinal = this.iten.product.price * this.iten.quantity;
        break;
    }
  }
}
