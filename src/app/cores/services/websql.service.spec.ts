import { TestBed } from '@angular/core/testing';

import { WebsqlService } from './websql.service';

describe('WebsqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsqlService = TestBed.get(WebsqlService);
    expect(service).toBeTruthy();
  });
});
