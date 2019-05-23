import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {
  private readonly BASE_URL = 'http://localhost:3600';

  constructor(private httpClient: HttpClient) {
  }

  public getCryptocurrencies(): Promise<any> {
    return this.httpClient
      .get(`${this.BASE_URL}/data`)
      .toPromise()
      .catch(this.logError.bind(this));
  }

  public getCryptocurrencyInfo(id: number | string): Promise<any> {
    return this.httpClient
      .get(`${this.BASE_URL}/info/${id}`)
      .toPromise()
      .catch(this.logError.bind(this));
  }

  private logError(error: any): void {
    console.log(error);
  }
}
