import {TestBed, async} from '@angular/core/testing';
import {DetailsComponent} from './details.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteMock, ApiServiceMock, NgxUiLoaderServiceMock} from '../../../../angular.mock';
import {ApiService} from '../../services/api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

describe('DetailsComponent', () => {
  let object;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent
      ],
      providers: [
        {
          provide: ActivatedRoute, useClass: ActivatedRouteMock
        },
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
    const fixture = TestBed.createComponent(DetailsComponent);
    object = fixture.componentInstance;
    expect(object instanceof DetailsComponent).toBe(true);
  });

  describe(' - Testing functions', () => {
    describe(' - Testing ngOnInit', () => {
      beforeEach(() => {
        spyOn(object, 'processRouteParams');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.ngOnInit();
        }).not.toThrow();
      });
    });

    describe(' - Testing getData', () => {
      beforeEach(() => {
        spyOn(object, 'processData');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.getData('1');
        }).not.toThrow();
      });
    });

    describe(' - Testing processData', () => {
      it(' - Function will not throw', () => {
        expect(() => {
          object.processData('1', {data: {}});
        }).not.toThrow();
      });
    });

    describe(' - Testing processRouteParams', () => {
      beforeEach(() => {
        spyOn(object, 'getData');
      });

      it(' - Function will not throw', () => {
        expect(() => {
          object.processRouteParams({});
        }).not.toThrow();
      });
    });
  });
});
