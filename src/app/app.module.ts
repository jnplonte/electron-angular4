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
// import { cggFormContainerComponent } from './components/cgg-form-container/cgg-form-container.component';
// import { cggFormButtonComponent } from './components/cgg-form-button/cgg-form-button.component';
// import { cggFormProgressComponent } from './components/cgg-form-progress/cgg-form-progress.component';
// import { cggFormInformationComponent } from './components/cgg-form-information/cgg-form-information.component';
// import { cggFormPromotionComponent } from './components/cgg-form-promotion/cgg-form-promotion.component';
// import { cggTitleComponent } from './components/cgg-title/cgg-title.component';
// import { cggErrorComponent } from './components/cgg-error/cgg-error.component';

// import { headLineComponent } from './components/headline/headline.component';
// import { disclaimerComponent } from './components/disclaimer/disclaimer.component';
// import { numberComponent } from './components/number/number.component';
// import { textComponent } from './components/text/text.component';
// import { emailComponent } from './components/email/email.component';
// import { tileSingleComponent } from './components/tile-single/tile-single.component';
// import { tileMultipleComponent } from './components/tile-multiple/tile-multiple.component';
// import { selectComponent } from './components/select/select.component';
// import { dropdownComponent } from './components/dropdown/dropdown.component';
// import { currencyComponent } from './components/currency/currency.component';
// import { checkboxComponent } from './components/checkbox/checkbox.component';

// import { saveFormDataDirective } from './directives/save-form-data/save-form-data.directive';

// import { formatCurrencyPipe }  from './pipes/format-currency/format-currency.pipe';
// import { getValueFromItemPipe }  from './pipes/get-value-from-item/get-value-from-item.pipe';
// import { formatObjectPipe }  from './pipes/format-object/format-object.pipe';

import { LogInComponent } from './components/log-in/log-in.component';

import { ConfigService } from './services/config/config.service';
import { DataBaseMainService } from './services/database/data-base-main.service';
import { DataBaseUserService } from './services/database/data-base-user.service';
import { HelperService } from './services/helper/helper.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

// import { formService } from './services/form/form.service';
// import { informationService } from './services/information/information.service';
// import { activityService } from './services/activity/activity.service';
// import { customerCloudService } from './services/customer-cloud/customer-cloud.service';


export class cggTranslateLoader implements TranslateLoader {
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
    { path: 'sign-up', component: SignUpComponent },

    { path: '**', component: PageNotFoundComponent }
];

const appTranslate: Object = {
    loader: {
        provide: TranslateLoader,
        useClass: cggTranslateLoader
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
                  RouterModule.forRoot(appRoutes, { useHash: true }) ],
  declarations: [ AppComponent,
                //   cggFormContainerComponent, cggFormButtonComponent, cggFormProgressComponent, cggFormInformationComponent, cggFormPromotionComponent, cggTitleComponent, cggErrorComponent,
                //   headLineComponent, disclaimerComponent, numberComponent, emailComponent, tileSingleComponent, tileMultipleComponent, textComponent, currencyComponent, selectComponent, dropdownComponent, checkboxComponent,
                //   saveFormDataDirective,
                //   formatCurrencyPipe, getValueFromItemPipe, formatObjectPipe, 
                  LogInComponent, SignUpComponent, PageNotFoundComponent, ForgotPasswordComponent, DashboardComponent ],
  providers:    [ AuthGuard, UnAuthGuard,
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'dataBaseMainService', useClass: DataBaseMainService},
                  {provide: 'dataBaseUserService', useClass: DataBaseUserService},
                  {provide: 'helperService', useClass: HelperService},
                  {provide: 'authenticationService', useClass: AuthenticationService},
                //   {provide: 'formService', useClass: formService},
                //   {provide: 'informationService', useClass: informationService},
                //   {provide: 'activityService', useClass: activityService},
                //   {provide: 'customerCloudService', useClass: customerCloudService} 
                ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
