import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-list-component',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  private inProgress = true;
  private items;
  private amounts = {};
  constructor(private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.getData();
  }

  private getAmount(id): number {
    return parseInt(localStorage.getItem(id), 10) || 0;
  }

  private getData(): void {
    this.httpClient.get('http://localhost:3600/data').subscribe(this.processData.bind(this), this.logError.bind(this));
  }

  private processData(data): void {
    this.items = data.data;
    this.inProgress = false;
  }

  private setAmount(id, amount): void {
    localStorage.setItem(id, amount);
  }

  private logError(error: any): void {
    console.log(error);
  }
}
