import { TestBed } from '@angular/core/testing';

import { DicomService } from './dicom.service';

describe('DicomService', () => {
  let service: DicomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DicomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
