import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpServiceService } from './http-service.service';
import { response } from '../mocks/mockServiceResponse';

describe('HttpServiceService', () => {
  let httpMock: HttpTestingController;
  let service: HttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpServiceService]
    });
    service = TestBed.inject(HttpServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the data from the API via GET', () => {
    const dummyList = response;
    service.getRepository('ayaz').subscribe(result => {
      expect(result?.items?.length).toBe(2);
      expect(result).toEqual(dummyList);
    })
    let url = service.formatUrl(service.baseUrl,'ayaz')
    const request = httpMock.expectOne(`${url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyList);
  });


});
