import { ThrowStmt } from '@angular/compiler';
import { Product } from './product.model';
import { Promotion } from './promotion-interface';

export class Iten {
  constructor(
    public product: Product,
    public quantity: number,
    public vrTotal: number,
    public vrFinal: number,
  ) { }

  getVrTotal() {
    this.vrTotal = this.quantity * this.product.price;
  }
  aplayPromotions() {
    if (this.product.promotions.length > 0) {
      for (let promotion of this.product.promotions) {
        this.checkPromotion(promotion);
      }
    }
    else {
      this.vrFinal = this.product.price * this.quantity;
    }
  }

  checkPromotion(promotion: Promotion) {
    switch (promotion.type) {
      case 'BUY_X_GET_Y_FREE':
        let promotionals = 0;
        let extra = 0;
        if ((this.quantity > 1) && (this.quantity % 2 === 0)) {
          promotionals = this.quantity / 2;
          extra = 0;
        } else {
          promotionals = ((this.quantity - 1) / 2);
          extra = 1;
        }
        this.vrFinal = (promotionals + extra) * this.product.price;
        break;
      case 'QTY_BASED_PRICE_OVERRIDE':
        let based = 0;
        let normal = 0;
        if ((this.quantity > 1) && (this.quantity % promotion.required_qty === 0)) {
          based = this.quantity / 2;
          normal = 0;
        } else {
          based = ((this.quantity - 1) / 2);
          normal = 1;
        }
        this.vrFinal = (based * promotion.price) + (normal * this.product.price);

        break;
      case 'FLAT_PERCENT':
        this.vrFinal = ((this.product.price - (this.product.price * (promotion.amount / 100))) * this.quantity);
        break;
      default:
        this.vrFinal = this.product.price * this.quantity;
        break;
    }
  }

}
