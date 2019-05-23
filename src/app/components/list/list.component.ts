/**
 * List component
 * Shows a paginated table containing most valuable cryptocurrencies
 * Allows user to set the amount of owned cryptocurrencies and calculates profits/losses as well as current amount of worth
 *
 * @author Uros Spasojevic
 */
import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-list-component',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  /**
   * Model object containing all input values
   * This property is used for ease of access to each input field without creating any additional forms
   */
  private amounts = {};

  /**
   * Indicator flag which is used to check if request is in progress already
   */
  private inProgress;

  /**
   * Interval id from setInterval function
   */
  private intervalId;

  /**
   * Collection of 50 most valuable cryptocurrencies
   */
  private items: any[];

  /**
   * Current page, default value is 1
   */
  private page = 1;

  /**
   * Items per page, default value is 10
   */
  private pageSize = 10;

  constructor(private apiService: ApiService,
              private ngxLoader: NgxUiLoaderService) {
  }

  /**
   * Angular life cycle hook
   * Starts acquiring the data
   */
  public ngOnInit(): void {
    this.getData();
  }

  /**
   * Returns the amount of specified cryptocurrency the user has
   */
  private getAmount(id: string): number {
    return parseFloat(this.getLocalStorageData(id).amount) || 0;
  }

  /**
   * Initializes loading mask and proceeds to gather data from backend
   */
  private getData(): void {
    if (!this.inProgress) {
      this.ngxLoader.start();
      this.apiService.getCryptocurrencies()
        .then(this.processData.bind(this));
    }
  }

  /**
   * Returns saved data about specified cryptocurrency
   */
  private getLocalStorageData(id: string): any {
    const data = localStorage.getItem(id);

    return data ? JSON.parse(data) : {};
  }

  /**
   * Maps each item in collection
   * Sets profits/losses and updates totals
   */
  private mapData(item): any {
    const pastData = this.getLocalStorageData(item.id);

    if (pastData.amount && pastData.pastTotal) {
      const currentTotal = item.quote.USD.price * pastData.amount;
      item.profits = currentTotal - pastData.pastTotal;
      pastData.pastTotal = currentTotal;
      this.setLocalStorageData(item.id, pastData);
    }

    return item;
  }

  /**
   * Processes data, removes indicator flag and removes loading mask
   */
  private processData(data): void {
    this.items = data.data.map(this.mapData.bind(this));
    this.inProgress = false;
    this.ngxLoader.stop();
    if (!this.intervalId) {
      this.intervalId = setInterval(this.getData.bind(this), 60000);
    }
  }

  /**
   * Loads last saved data if any and sets new amount and total for specified cryptocurrency
   */
  private setAmount(id: string, amount: number, price: number): void {
    const data = {
      amount,
      pastTotal: amount * price
    };
    this.amounts[id] = undefined;
    this.setLocalStorageData(id, data);
  }

  /**
   * Saves data to local storage
   */
  private setLocalStorageData(id, data): void {
    localStorage.setItem(id, JSON.stringify(data));
  }

  /**
   * Validates field with the specified id
   */
  private validateField(id: string): boolean {
    let valid = false;
    const regex = /^[0-9]*(\.[0-9]+)?$/g;
    if (this.amounts[id]) {
      valid = regex.test(this.amounts[id]);
    }
    return !valid;
  }
}
