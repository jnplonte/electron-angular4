import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

import { ConfigService } from './app/services/config/config.service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

let documentElm: any = document.querySelector('cgg-funnel');

ConfigService.loadInstance(documentElm.getAttribute('config'), documentElm.getAttribute('lang')).then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
});
