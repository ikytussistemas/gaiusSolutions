import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ CheckoutService ]
    });
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have aplayPromotions function', () => {
    expect(service.aplayPromotions).toBeTruthy();
   });

  it('should have checkPromotion function', () => {
    expect(service.checkPromotion).toBeTruthy();
   });

  it('should iten not null', () => {
    expect(service.iten !== null).toBeTruthy();
   });

});
