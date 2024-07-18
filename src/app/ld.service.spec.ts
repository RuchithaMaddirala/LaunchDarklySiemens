import { TestBed } from '@angular/core/testing';

import { LDService } from './ld.service';

describe('LDService', () => {
  let service: LDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
