import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-details-component',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent implements OnInit {
  private data;
  private id;
  private inProgress = true;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(this.processRouteParams.bind(this));
  }

  private getData(): void {
    this.apiService.getCryptocurrencyInfo(this.id)
      .then(this.processData.bind(this));
  }

  private processData(data: any): void {
    this.data = data.data;
    this.inProgress = false;
  }

  private processRouteParams(params: any) {
    this.id = params.id;
    this.getData();
  }
}

