import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-otomeyt',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    appActive: boolean = true;
    configError: boolean = false;

    constructor(translate: TranslateService, @Inject('configService') private configService: any) {
        translate.setDefaultLang('default');

        this.configError = (typeof(configService.data.hasError) !== 'undefined' && configService.data.hasError === 'true');

        console.log(configService.data);
    }
}
