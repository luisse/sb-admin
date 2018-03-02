import { TestBed, inject } from '@angular/core/testing';

import { Auth.Service } from './auth.service';

describe('Auth.Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.ServiceService]
    });
  });

  it('should be created', inject([Auth.Service], (service: Auth.Service) => {
    expect(service).toBeTruthy();
  }));
});
