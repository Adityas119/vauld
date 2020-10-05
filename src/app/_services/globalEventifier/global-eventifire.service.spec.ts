import { TestBed } from '@angular/core/testing';

import { GlobalEventifireService } from './global-eventifire.service';

describe('GlobalEventifireService', () => {
  let service: GlobalEventifireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEventifireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
