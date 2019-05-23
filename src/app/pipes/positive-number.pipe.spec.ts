import {async, TestBed} from '@angular/core/testing';
import {PositiveNumberPipe} from './positive-number.pipe';

describe('ApiService', () => {
  let object;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          PositiveNumberPipe
        ]
      }
    ).compileComponents();
  }));

  it('should have been created', () => {
    object = new PositiveNumberPipe();

    expect(object instanceof PositiveNumberPipe).toBe(true);
  });

  describe(' - Testing functions', () => {
    let value;

    describe(' - Testing transform', () => {
      describe(' - Testing when value is >= 0', () => {
        it(' - Function will not throw', () => {
          expect(() => {
            value = object.transform(0);
          }).not.toThrow();
          expect(value).toEqual(0);
        });
      });

      describe(' - Testing when value is < 0', () => {
        it(' - Function will not throw', () => {
          expect(() => {
            value = object.transform(-10);
          }).not.toThrow();
          expect(value).toEqual(10);
        });
      });
    });
  });
});
