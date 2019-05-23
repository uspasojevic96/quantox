/**
 * Api service
 * Provides calls to backend
 *
 * @author Uros Spasojevic
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {
  /**
   * Backend URL
   */
  private readonly BASE_URL = 'http://localhost:3600';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Returns promise which resolves with 50 most valuable cryptocurrencies
   */
  public getCryptocurrencies(): Promise<any> {
    return this.httpClient
      .get(`${this.BASE_URL}/data`)
      .toPromise()
      .catch(this.logError.bind(this));
  }

  /**
   * Returns promise which resolves with info about specified cryptocurrency
   */
  public getCryptocurrencyInfo(id: number | string): Promise<any> {
    return this.httpClient
      .get(`${this.BASE_URL}/info/${id}`)
      .toPromise()
      .catch(this.logError.bind(this));
  }

  /**
   * Logs errors to console, used in conjunction with promises
   */
  private logError(error: any): void {
    console.log(error);
  }
}
