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

  getVrTotal(): void {
    this.vrTotal = this.quantity * this.product.price;
  }
}
