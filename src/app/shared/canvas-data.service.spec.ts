import { TestBed } from '@angular/core/testing';

import { CanvasDataService } from './canvas-data.service';

describe('CanvasDataService', () => {
  let service: CanvasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
