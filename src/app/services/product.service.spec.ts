import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductService } from './product.service';


describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ ProductService ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have findOnlyProducts function', () => {
    expect(service.findOnlyProducts).toBeTruthy();
   });

  it('should have findById function', () => {
    expect(service.findById).toBeTruthy();
  });

  it('should have http inject', () => {
    expect(service.http).toBeTruthy();
  });

  it('should urlResouce not null', () => {
    expect(service.urlResouce !== null).toBeTruthy();
  });
});
