import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { ConfigService } from './services/config/config.service';
import { DataBaseMainService } from './services/database/database-main.service';
import { DataBaseUserService } from './services/database/database-user.service';
import { HelperService } from './services/helper/helper.service';
import { AlertService } from './services/alert/alert.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

import { LogInComponent } from './components/log-in/log-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';

export class jsonTranslateLoader implements TranslateLoader {
    private translation: Object = {};
    constructor() {
        this.translation = ConfigService.getInstance()['translation'] || {};
    }

    public getTranslation(lang: string = 'default'): Observable<any> {
        return Observable.create(observer => {
            observer.next(this.translation);
            observer.complete();
      });
    }
}

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'log-in', component: LogInComponent, canActivate: [UnAuthGuard] },

    { path: '**', component: PageNotFoundComponent }
];

const appTranslate: Object = {
    loader: {
        provide: TranslateLoader,
        useClass: jsonTranslateLoader
    }
};

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  JsonpModule,
                  FormsModule,
                  ReactiveFormsModule,
                  BrowserAnimationsModule,
                  HttpClientModule,
                  TranslateModule.forRoot(appTranslate),
                  RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent,
                  LogInComponent, PageNotFoundComponent, ForgotPasswordComponent, DashboardComponent, AlertComponent ],
  providers:    [ AuthGuard, UnAuthGuard,
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'dataBaseMainService', useClass: DataBaseMainService},
                  {provide: 'dataBaseUserService', useClass: DataBaseUserService},
                  {provide: 'helperService', useClass: HelperService},
                  {provide: 'alertService', useClass: AlertService},
                  {provide: 'authenticationService', useClass: AuthenticationService}
                ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
