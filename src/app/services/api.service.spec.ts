import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientMock} from '../../../angular.mock';
import {ApiService} from './api.service';

describe('ApiService', () => {
  let object;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useClass: HttpClientMock
      }]
    }).compileComponents();
  }));

  it('should have been created', () => {
    const injector = getTestBed();
    const httpClient = injector.get(HttpClient);
    object = new ApiService(httpClient);

    expect(object instanceof ApiService).toBe(true);
  });

  describe(' - Testing functions', () => {
    describe(' - Testing getCryptocurrencies', () => {
      beforeEach(() => {
        spyOn(object, 'logError');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.getCryptocurrencies();
        }).not.toThrow();
      });
    });

    describe(' - Testing getCryptocurrencyInfo', () => {
      beforeEach(() => {
        spyOn(object, 'logError');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.getCryptocurrencyInfo();
        }).not.toThrow();
      });
    });

    describe(' - Testing logError', () => {
      beforeEach(() => {
        spyOn(console, 'log');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.logError('a');
        }).not.toThrow();
      });
    });
  });


});
