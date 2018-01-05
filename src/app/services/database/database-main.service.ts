import { Injectable, EventEmitter, Inject } from '@angular/core';
import { DataBaseService } from './database.service';

import { mainModel } from './../../models/main.model';

@Injectable()
export class DataBaseMainService extends DataBaseService {

    private isInstantiated: boolean = false;

    constructor(@Inject('configService') configService: any) {
        super();

        if (!this.isInstantiated && typeof(configService.data.dataBaseInformation) !== 'undefined' && configService.data.dataBaseInformation.hasOwnProperty('user')) {
            this.DatabaseInformation = configService.data.dataBaseInformation;

            this.Database = configService.data.dataBaseInformation['main'];

            this.isInstantiated = true;
        }
    }
}
