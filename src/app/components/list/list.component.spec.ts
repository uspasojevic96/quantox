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
});
