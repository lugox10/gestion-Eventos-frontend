import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
