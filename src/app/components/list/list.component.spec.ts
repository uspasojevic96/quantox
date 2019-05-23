import {async, TestBed} from '@angular/core/testing';
import {ApiServiceMock, NgxUiLoaderServiceMock} from '../../../../angular.mock';
import {ApiService} from '../../services/api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ListComponent} from './list.component';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PositiveNumberPipe} from '../../pipes/positive-number.pipe';

describe('ListComponent', () => {
  let object;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        NgbPagination,
        PositiveNumberPipe
      ],
      imports: [
        FormsModule,
        RouterModule
      ],
      providers: [
        {
          provide: ApiService, useClass: ApiServiceMock
        },
        {
          provide: NgxUiLoaderService, useClass: NgxUiLoaderServiceMock
        }
      ]
    }).compileComponents();
  }));

  it('should have been created', () => {
    const fixture = TestBed.createComponent(ListComponent);
    object = fixture.componentInstance;
    expect(object instanceof ListComponent).toBe(true);
  });

  describe(' - Testing functions', () => {
    describe(' - Testing ngOnInit', () => {
      beforeEach(() => {
        spyOn(object, 'getData');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.ngOnInit();
        }).not.toThrow();
      });
    });

    describe(' - Testing getAmount', () => {
      describe(' - Testing when data exists', () => {
        beforeEach(() => {
          spyOn(object, 'getLocalStorageData').and.callFake(() => {
            return {
              amount: '10'
            };
          });
        });

        it(' - Function will not throw', () => {
          let value;
          expect(() => {
            value = object.getAmount('1');
          }).not.toThrow();
          expect(value).toEqual(10);
        });
      });

      describe(' - Testing when data does not exist', () => {
        beforeEach(() => {
          spyOn(object, 'getLocalStorageData').and.callFake(() => {
            return {};
          });
        });

        it(' - Function will not throw', () => {
          let value;
          expect(() => {
            value = object.getAmount('1');
          }).not.toThrow();
          expect(value).toEqual(0);
        });
      });
    });

    describe(' - Testing getData', () => {
      describe(' - Testing when inProgress is false', () => {
        beforeEach(() => {
          spyOn(object, 'processData');
          object.inProgress = false;
        });

        it(' - Function will not throw', () => {
          expect(() => {
            object.getData();
          }).not.toThrow();
        });
      });

      describe(' - Testing when inProgress is true', () => {
        beforeEach(() => {
          spyOn(object, 'processData');
          object.inProgress = true;
        });

        it(' - Function will not throw', () => {
          expect(() => {
            object.getData();
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing getLocalStorageData', () => {
      describe(' - Testing when data exists', () => {
        beforeEach(() => {
          spyOn(localStorage, 'getItem').and.callFake(() => {
            return '{"amount": "10", "pastTotal": "10"}';
          });
        });

        it(' - Function will not throw', () => {
          let value;
          expect(() => {
            value = object.getLocalStorageData('1');
          }).not.toThrow();
          expect(value.amount).toEqual('10');
          expect(value.pastTotal).toEqual('10');
        });
      });

      describe(' - Testing when data does not exist', () => {
        beforeEach(() => {
          spyOn(localStorage, 'getItem');
        });

        it(' - Function will not throw', () => {
          let value;
          expect(() => {
            value = object.getLocalStorageData('1');
          }).not.toThrow();
          expect(value.amount).toEqual(undefined);
          expect(value.pastTotal).toEqual(undefined);
        });
      });
    });

    describe(' - Testing mapData', () => {
      let value;

      beforeEach(() => {
        spyOn(object, 'setLocalStorageData');
      });

      describe(' - Testing when amount is defined', () => {
        const data = {
          id: 1,
          quote: {
            USD: {
              price: 1
            }
          }
        };

        describe(' - Testing when pastTotal is undefined', () => {
          beforeEach(() => {
            spyOn(object, 'getLocalStorageData').and.callFake(() => {
              return {
                amount: 10
              };
            });
          });

          it(' - Function will not throw', () => {
            expect(() => {
              value = object.mapData(data);
            }).not.toThrow();
            expect(value.profits).toEqual(undefined);
          });
        });

        describe(' - Testing when pastTotal is defined', () => {
          beforeEach(() => {
            spyOn(object, 'getLocalStorageData').and.callFake(() => {
              return {
                amount: 10,
                pastTotal: 10
              };
            });
          });

          it(' - Function will not throw', () => {
            expect(() => {
              value = object.mapData(data);
            }).not.toThrow();
            expect(value.profits).toEqual(0);
          });
        });
      });

      describe(' - Testing when amount is undefined', () => {
        const data = {
          id: 1,
          quote: {
            USD: {
              price: 1
            }
          }
        };

        beforeEach(() => {
          spyOn(object, 'getLocalStorageData').and.callFake(() => {
            return {};
          });
        });

        it(' - Function will not throw', () => {
          expect(() => {
            value = object.mapData(data);
          }).not.toThrow();
          expect(value.profits).toEqual(undefined);
        });
      });
    });

    describe(' - Testing processData', () => {
      beforeEach(() => {
        spyOn(object, 'mapData');
      });

      describe(' - Testing when intervalId is defined', () => {
        beforeEach(() => {
          object.intervalId = 1;
        });

        it(' - Function will not throw', () => {
          expect(() => {
            object.processData({
              data: []
            });
          }).not.toThrow();
        });
      });

      describe(' - Testing when intervalId is undefined', () => {
        beforeEach(() => {
          object.intervalId = undefined;
          spyOn(window, 'setInterval');
          spyOn(object, 'getData');
        });

        it(' - Function will not throw', () => {
          expect(() => {
            object.processData({
              data: []
            });
          }).not.toThrow();
        });
      });
    });

    describe(' - Testing setAmount', () => {
      beforeEach(() => {
        spyOn(object, 'getLocalStorageData').and.callFake(() => {
          return {};
        });
        spyOn(object, 'setLocalStorageData');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.setAmount('1', 10, 10);
        }).not.toThrow();
      });
    });

    describe(' - Testing setLocalStorageData', () => {
      beforeEach(() => {
        spyOn(localStorage, 'setItem');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.setLocalStorageData('1', {});
        }).not.toThrow();
      });
    });

    describe(' - Testing validateField', () => {
      let value;

      describe(' - Testing when value is undefined', () => {
        beforeEach(() => {
          object.amounts['1'] = undefined;
        });

        it(' - Function will not throw', () => {
          expect(() => {
            value = object.validateField('1');
          }).not.toThrow();
          expect(value).toBe(true);
        });
      });

      describe(' - Testing when value is defined and correct', () => {
        beforeEach(() => {
          object.amounts['1'] = 1;
        });

        it(' - Function will not throw', () => {
          expect(() => {
            value = object.validateField('1');
          }).not.toThrow();
          expect(value).toBe(false);
        });
      });

      describe(' - Testing when value is defined and incorrect', () => {
        beforeEach(() => {
          object.amounts['1'] = 'a';
        });

        it(' - Function will not throw', () => {
          expect(() => {
            value = object.validateField('1');
          }).not.toThrow();
          expect(value).toBe(true);
        });
      });
    });
  });
});
