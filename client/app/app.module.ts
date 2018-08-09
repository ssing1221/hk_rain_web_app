import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SettingComponent } from './components/setting/setting.component';
import { WeatherForecastComponent } from './components/weatherForecast/weatherForecast.component';
import { WeeklyPredictComponent } from './components/weeklyPredict/weeklyPredict.component';
import { CalculateWeatherComponent } from './components/calculateWeather/calculateWeather.component';

import { WeatherService } from './services/weather.service';
import { ForecastService } from './services/forecast.service';
import { AccountService } from './services/account.service';
import { FeedbackService } from './services/feedback.service';

import { OT_GConstants, GConstants } from './constants/GConstants';

import { TranslateModule } from 'ng2-translate';

import { DataTableModule, SharedModule, TabViewModule, ChartModule,
         BlockUIModule, PanelModule, MessagesModule, GrowlModule} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing,
    DataTableModule, 
    SharedModule, 
    TabViewModule,
    BlockUIModule,
    PanelModule,
    MessagesModule,
    GrowlModule,
    ChartModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    AdminComponent,
    FeedbackComponent,
    SettingComponent,
    WeatherForecastComponent,
    WeeklyPredictComponent,
    CalculateWeatherComponent
  ],
  providers: [
    AccountService,
    FeedbackService,
    WeatherService,
    ForecastService,
    { provide: OT_GConstants, useValue: GConstants }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
