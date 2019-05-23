import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-list-component',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  private inProgress = true;
  private items;
  private amounts = {};

  constructor(private apiService: ApiService) {
  }

  public ngOnInit(): void {
    this.getData();
  }

  private getAmount(id): number {
    return parseInt(localStorage.getItem(id), 10) || 0;
  }

  private getData(): void {
    // this.apiService.getCryptocurrencies()
    //   .then(this.processData.bind(this));
  }

  private processData(data): void {
    this.items = data.data;
    this.inProgress = false;
  }

  private setAmount(id, amount): void {
    localStorage.setItem(id, amount);
  }
}
