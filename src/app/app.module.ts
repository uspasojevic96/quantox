import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ListComponent} from './components/list/list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DetailsComponent} from './components/details/details.component';
import {ApiService} from './services/api.service';
import {PositiveNumberPipe} from './pipes/positive-number.pipe';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    PositiveNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
    NgxUiLoaderModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
