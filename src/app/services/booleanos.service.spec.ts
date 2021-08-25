import { TestBed } from '@angular/core/testing';

import { BooleanosService } from './booleanos.service';

describe('BooleanosService', () => {
  let service: BooleanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooleanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
