import {AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {PositionModel} from '../shared-models/position.model';
import {BehaviorSubject} from 'rxjs';
import {BoundingBoxModel} from '../shared-models/bounding-box.model';
import {PhotoModel} from '../shared-models/photo.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSelectChange} from '@angular/material/select';
import {SearchPhotosModel} from '../shared-models/search-photos.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {TagModel} from '../shared-models/tag.model';

@Component({
    selector: 'pictly-search',
    templateUrl: './search.component.html',
    animations: [
        trigger('toggleFilter', [
            state('open', style({
                height: '50px'
            })),
            state('closed', style({
                boxShadow: 'none',
                height: '0px'
            })),
            transition('open => closed', [
                animate('0.13s')
            ]),
            transition('closed => open', [
                animate('0.13s')
            ])
        ])
    ]
})
export class SearchComponent implements OnInit, AfterViewInit {
    // Readonly properties
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];


    // Public properties
    cacheKeyAddressSearch = 'address_search';
    autocompleteList: string[] = [];
    autocomplete: google.maps.places.Autocomplete;
    isFilterOpen = false;
    slideShowItem: PhotoModel;


    // Input parameters
    @Input() position: BehaviorSubject<PositionModel> = new BehaviorSubject<PositionModel>(new PositionModel(24, 12));
    @Input() boundingBox: BehaviorSubject<BoundingBoxModel> = new BehaviorSubject<BoundingBoxModel>(null);
    @Input() photosModel: BehaviorSubject<SearchPhotosModel> = new BehaviorSubject<SearchPhotosModel>(null);
    @Input() paging: { itemsPerPage: number, currentPage: number, itemCountOptions: number[], tags: TagModel[] };


    // Output events
    @Output() selectPhoto: EventEmitter<PhotoModel> = new EventEmitter<PhotoModel>();
    @Output() loadMore: EventEmitter<BoundingBoxModel> = new EventEmitter<BoundingBoxModel>();


    // Element references
    @ViewChild('searchComponent') searchComponent: ElementRef;


    constructor(
        private localStorageService: LocalStorageService,
        private ngZone: NgZone
    ) {
    }


    // Lifecycle hooks
    ngOnInit(): void {
        this.autocompleteList = this.localStorageService.getCachedValue(this.cacheKeyAddressSearch);
    }

    ngAfterViewInit(): void {
        const currentBounds = this.boundingBox.getValue();
        const autocompleteOptions: google.maps.places.AutocompleteOptions = {
            types: ['address']
        };

        // Apply bounds if there are bounds set
        // TODO: Chris - Check that this is working as expected
        if (currentBounds) {
            autocompleteOptions.bounds = currentBounds;
        }

        // Set up the autocomplete input field
        this.autocomplete = new google.maps.places.Autocomplete(
            this.searchComponent.nativeElement,
            autocompleteOptions
        );

        this.registerAutoCompleteChangeEvent();
    }


    // Public methods
    public toggleFilter(): void {
        this.isFilterOpen = !this.isFilterOpen;
    }

    public setItemsPerPage(event: MatSelectChange): void {
        this.paging.itemsPerPage = event.value;
    }

    public openSlideshow(photo: PhotoModel) {
        this.selectPhoto.emit(photo);
    }

    public loadMorePhotos() {
        const boundingBox = this.boundingBox.getValue();

        this.paging.currentPage++;

        this.loadMore.emit(boundingBox);
    }

    public addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add the tag for search query params
        if ((value || '').trim()) {
            this.paging.tags.push(
                new TagModel(value.trim())
            );
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    public removeTag(tag: TagModel): void {
        const index = this.paging.tags.indexOf(tag);

        if (index >= 0) {
            this.paging.tags.splice(index, 1);
        }
    }


    // Private methods
    private registerAutoCompleteChangeEvent(): void {
        this.autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                const currentSearchedPlace = this.autocomplete.getPlace();

                if (!currentSearchedPlace.geometry) {
                    return;
                }

                const newMapData = new PositionModel(
                    currentSearchedPlace.geometry.location.lat(),
                    currentSearchedPlace.geometry.location.lng()
                );

                this.position.next(newMapData);
            });
        });
    }
}
