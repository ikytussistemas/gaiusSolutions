import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductService } from 'src/app/services/product.service';

import { ProductListComponent } from './product-list.component';
import { Observable } from 'rxjs';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let checkoutServiceStub: Partial<CheckoutService>;
  checkoutServiceStub = {
    aplayPromotions: () => { },
    checkPromotion: () => { },
  };

  let productServiceStub: Partial<ProductService>;

  productServiceStub = {
    findOnlyProducts: () => new Observable()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: CheckoutService, useValue: checkoutServiceStub },
        { provide: ProductService, useValue: productServiceStub }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
