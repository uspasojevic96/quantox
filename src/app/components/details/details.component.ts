/**
 * Details component
 * Shows all available data about specified cryptocurrency
 *
 * @author Uros Spasojevic
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-details-component',
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
  /**
   * Data about specific cryptocurrency
   */
  private data;

  /**
   * Indicator flag which is used to check if request is in progress already
   */
  private inProgress = true;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private ngxLoader: NgxUiLoaderService) {
  }

  /**
   * Angular life cycle hook
   * Reads route parameters
   */
  public ngOnInit(): void {
    this.route.params.subscribe(this.processRouteParams.bind(this));
  }

  /**
   * Retrieves data from backend about specified cryptocurrency
   */
  private getData(id: string): void {
    this.ngxLoader.start();
    this.apiService.getCryptocurrencyInfo(id)
      .then(this.processData.bind(this, id));
  }

  /**
   * Processes data
   */
  private processData(id: string, data: any): void {
    this.data = data.data[id];
    this.inProgress = false;
    this.ngxLoader.stop();
  }

  /**
   * Processes route parameters and starts retrieving data
   */
  private processRouteParams(params: any): void {
    this.getData(params.id);
  }
}

