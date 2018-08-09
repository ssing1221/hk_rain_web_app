import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SettingComponent } from './components/setting/setting.component';
import { WeatherForecastComponent } from './components/weatherForecast/weatherForecast.component';
import { WeeklyPredictComponent } from './components/weeklyPredict/weeklyPredict.component';
import { CalculateWeatherComponent } from './components/calculateWeather/calculateWeather.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/calculateWeather',
    pathMatch: 'full'
  },
  {
    path: 'calculateWeather',
    component: CalculateWeatherComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'weatherForecast',
    component: WeatherForecastComponent
  },
  {
    path: 'weeklyPredict',
    component: WeeklyPredictComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
