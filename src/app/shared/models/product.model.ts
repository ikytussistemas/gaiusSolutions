import { Promotion } from './promotion-interface';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public promotions: Promotion[],
  ) { }
}
