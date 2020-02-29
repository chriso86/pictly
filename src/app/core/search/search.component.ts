import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'pictly-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    cacheKeyAddressSearch = 'address_search';
    autocompleteList: string[] = [];
    address = '';
    timerId = null;
    timerDelay = 2; // 2 seconds

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.autocompleteList = this.localStorageService.getCachedValue(this.cacheKeyAddressSearch);
    }

    processAddressSearch(event: InputEvent) {
        if (!this.timerId) {
            this.timerId = setTimeout(() => {



            }, (1000 * this.timerDelay));
        }
    }
}
