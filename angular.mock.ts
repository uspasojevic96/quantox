import {of} from 'rxjs';

export class ActivatedRouteMock {
  public params = of(Object());
}

export class ApiServiceMock {
  public getCryptocurrencyInfo(id: string): Promise<any> {
    return Promise.resolve({});
  }
}

export class NgxUiLoaderServiceMock {
  public start(): void {
  }
  public stop(): void {
  }
}
