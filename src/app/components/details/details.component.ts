import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ObservableInput} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-details-component',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent implements OnInit {
  private id;
  private inProgress = true;
  private data;

  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(this.processRouteParams.bind(this));
  }

  private processRouteParams(params: any) {
    this.id = params.id;
    this.getData();
  }

  private getData(): void {
    this.httpClient.get(`http://localhost:3600/info/${this.id}`)
      .subscribe(this.processData.bind(this), this.logError.bind(this));
  }

  private processData(data: any): void {
    this.data = data.data;
    this.inProgress = false;
  }

  private logError(error): void {
    console.log(error);
  }
}

