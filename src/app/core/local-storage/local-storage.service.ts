import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LocalStorageHelper} from './local-storage.helper';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    appPrefix = 'pictly';
    appVersion = environment.version;

    cleanOldVersionCachedItems(): void {
        LocalStorageHelper.clearLocalStorageItemsMatchingString(this.appPrefix);
    }

    getCachedValue(key: string): any {
        const formattedKey = `${this.appPrefix}_${this.appVersion}_${key}`;

        LocalStorageHelper.getLocalStorageItem(formattedKey);
    }

    setCachedValue(key: string, value: any): void {
        const formattedKey = `${this.appPrefix}_${this.appVersion}_${key}`;

        LocalStorageHelper.setLocalStorageItem(formattedKey, value);
    }
}
