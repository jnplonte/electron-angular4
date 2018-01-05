import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class ConfigService {
    private static encyptionKey: string = 'otomeyt-secret-key';

    private static configData: Object = {
        'env': 'development',
        'data': {},
        'translation': {}
    };

    private static setConfigData(configData: Object = {}) {
        this.configData['data'] = configData;
    }

    private static setEnvironment() {
        this.configData['env'] = process.env.ENV || 'development';
    }

    private static setTranslation(translationData: Object = {}) {
        this.configData['translation'] = translationData;
    }

    private static getXMLHttp(url: string, method: string = 'GET') {
        return new Promise((resolve, reject) => {
            let xobj: any = new XMLHttpRequest();
            xobj.overrideMimeType('application/json');
            xobj.open(method, url, true);
            xobj.onreadystatechange = () => {
                if (xobj.readyState === 4) {
                    if (xobj.status === 200) {
                        resolve(xobj.responseText);
                    } else {
                        reject('error');
                    }
                }
            };
            xobj.send(null);
        });
    }

    public static loadInstance(jsonConfig: string, langConfig: string) {
        let promiseArray: Array<any> = [];
        // if (process.env.ENV === 'production') {
        //     jsonConfig = jsonConfig.replace(/(.*)\.(.*?)$/, '$1') + '.txt';
        // }

        promiseArray.push(this.getXMLHttp(jsonConfig));
        promiseArray.push(this.getXMLHttp(langConfig));

        return Promise.all(promiseArray).then(promiseValue => {
            try {
                let encyptionConfigValue: Object = {};
                if (process.env.ENV === 'production') {
                    let encyptionConfig: any  = CryptoJS.AES.decrypt(promiseValue[0] || '', this.encyptionKey);
                    encyptionConfigValue = JSON.parse(encyptionConfig.toString(CryptoJS.enc.Utf8));
                } else {
                    encyptionConfigValue = JSON.parse(promiseValue[0] || '');
                }
                this.setConfigData(encyptionConfigValue);
            } catch (e) {
                this.setConfigData({'hasError': 'true'});
            }

            this.setEnvironment();
            this.setTranslation( (typeof(promiseValue[1]) !== 'undefined' ) ? JSON.parse(promiseValue[1]) : {});
        }).catch(rejectValue => {
            this.setConfigData({'hasError': 'true'});

            this.setEnvironment();
            this.setTranslation({});
        });
    }

    public static getInstance() {
        return this.configData || {};
    }
}
