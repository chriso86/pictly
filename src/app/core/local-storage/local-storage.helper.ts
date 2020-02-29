export class LocalStorageHelper {
    public static getLocalStorageItem(key: string): any {
        if (!key) {
            throw new Error('LocalStorage -> getLocalStorageItem: The key provided is invalid, and requires a value');
        }

        try {
            const stringifiedValue = localStorage.getItem(key);
            const parsedValue = JSON.parse(stringifiedValue);

            return parsedValue;
        } catch (e) {
            throw new Error('LocalStorage -> getLocalStorageItem: Unexpected error occurred - Could not store the item in local storage.');
        }
    }

    public static setLocalStorageItem(key: string, value: any): void {
        if (!key) {
            throw new Error('LocalStorage -> setLocalStorageItem: The key provided is invalid, and requires a value');
        }

        try {
            const stringifiedValue = JSON.stringify(value);

            localStorage.setItem(key, stringifiedValue);
        } catch (e) {
            throw new Error('LocalStorage -> setLocalStorageItem: Unexpected error occurred - Could not store the item in local storage.');
        }
    }

    public static clearLocalStorageItem(key: string): void {
        if (!key) {
            throw new Error('LocalStorage -> clearLocalStorageItem: The key provided is invalid, and requires a value');
        }

        try {
            const item = localStorage.getItem(key);

            if (!item) {
                return;
            }

            localStorage.removeItem(key);
        } catch (e) {
            throw new Error('LocalStorage -> clearLocalStorageItem: Unexpected error occurred - ' +
                'Could not store the item in local storage.');
        }
    }

    public static clearLocalStorageItemsMatchingString(keyPart: string): void {
        const itemKeysMatchingKeyPart = [];

        for (let i = 0; i < localStorage.length; i++) {
            const itemKey = localStorage.key(i);

            if (itemKey.indexOf(keyPart) > -1) {
                itemKeysMatchingKeyPart.push(itemKey);
            }
        }

        if (itemKeysMatchingKeyPart.length) {
            itemKeysMatchingKeyPart.forEach(key => this.clearLocalStorageItem(key));
        }
    }
}
