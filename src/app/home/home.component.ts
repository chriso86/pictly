import {Component, OnInit} from '@angular/core';
import {PositionModel} from '../core/shared-models/position.model';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {PhotoModel} from '../core/shared-models/photo.model';
import {FlickrGateway} from '../core/flickr/flickr.gateway';
import {BoundingBoxModel} from '../core/shared-models/bounding-box.model';
import {LicenseModel} from '../core/shared-models/license.model';
import {SearchPhotosModel} from '../core/shared-models/search-photos.model';
import {PhotoWithInfoDto} from '../core/flickr/photo-with-info.dto';
import {SlideshowModel} from '../core/shared-models/slideshow.model';
import {MatDialog} from '@angular/material/dialog';
import {SlideshowComponent} from '../core/slideshow/slideshow.component';
import {LoaderService} from '../core/loader/loader.service';
import {Loader} from '../core/loader/loader.model';
import {tap} from 'rxjs/operators';
import {DefaultLoaderStatesEnum} from '../core/loader/default-loader-states.enum';

@Component({
    selector: 'pictly-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    // Public properties
    positionModel: BehaviorSubject<PositionModel> = new BehaviorSubject<PositionModel>(new PositionModel(24, 12));
    boundingBoxModel: BehaviorSubject<BoundingBoxModel> = new BehaviorSubject<BoundingBoxModel>(
        new BoundingBoxModel(
            28.046293,
            -26.113057,
            28.065283,
            -26.096255
        ));
    photosModel: BehaviorSubject<SearchPhotosModel> = new BehaviorSubject<SearchPhotosModel>(new SearchPhotosModel(0, []));
    licensesModel: LicenseModel[] = [];
    pagingModel = {
        currentPage: 1,
        itemsPerPage: 10,
        itemCountOptions: [10, 25, 50],
        tags: []
    };
    loader: Loader;
    loadingStates = DefaultLoaderStatesEnum;


    constructor(
        private loaderService: LoaderService,
        private flickrGateway: FlickrGateway,
        public dialog: MatDialog
    ) {
        this.loader = this.loaderService.buildLoader();
    }

    // Lifecycle hooks
    ngOnInit(): void {
        this.setLicenses();

        this.boundingBoxModel.subscribe((boundingBox: BoundingBoxModel) => {
            this.setFlickrImages(boundingBox);
        });
    }


    // Public methods
    public setFlickrImages(boundingBox: BoundingBoxModel) {
        const photoModel = this.photosModel.getValue();
        const previousBoundingBox = photoModel.boundingBox;
        const observableList: Observable<PhotoWithInfoDto>[] = [];

        this.flickrGateway.getPhotosForBoundedLocation(
            boundingBox,
            this.pagingModel.itemsPerPage,
            this.pagingModel.currentPage,
            this.pagingModel.tags
        ).subscribe((response: SearchPhotosModel) => {
            // Update the bounding box to track the results location per the map
            response.setBoundingBox(boundingBox);

            // If the bounding box hasn't changed, then update the photos array with the new photos
            if (previousBoundingBox && previousBoundingBox.equalTo(boundingBox)) {
                /*
                The subsequent call to get the photo details should still work with the code below
                This is because concat returns a shallow copy of the combined array,
                so original object references should still be fine.
                 */
                photoModel.photos = photoModel.photos.concat(response.photos);
            }

            // Hydrate photos with additional data
            response.photos.forEach(photo => {
                observableList.push(this.setPhotoDetails(photo));
            });

            // Join all observables into one subscription so that we can populate the photos model after all data has been set
            (observableList
                    ? forkJoin(observableList)
                    : of([])
            ).subscribe(() => {
                // Set the photo model for the new bounding box
                this.photosModel.next(response);

                this.loader.setState(this.loadingStates.AwaitingUserInput);
            });
        });
    }

    public openSlideshowForPhoto(photo: PhotoModel) {
        const photoModel = this.photosModel.getValue();
        const slideshowModel = new SlideshowModel(photoModel.photos, photo);

        this.dialog.open(SlideshowComponent, {
            width: '80%',
            height: '80%',
            data: slideshowModel
        });
    }


    // Private methods
    private setLicenses() {
        this.flickrGateway.getAllLicenses()
            .subscribe((licenses: LicenseModel[]) => {
                this.licensesModel = licenses;
            });
    }

    private setPhotoDetails(photo: PhotoModel): Observable<PhotoWithInfoDto> {
        return this.flickrGateway.getDetailsForPhoto(photo)
            .pipe(
                tap((photoWithInfoDto: PhotoWithInfoDto) => {
                    const photoWithInfo = photoWithInfoDto.photo;
                    const matchingLicense = this.licensesModel.find(license => license.id === photoWithInfo.license);

                    // Map extra info on to the original photo object
                    photo.description = photoWithInfo.description._content;

                    if (photoWithInfo.dateuploaded) {
                        photo.setUploadDate(photoWithInfo.dateuploaded);
                    }

                    if (photoWithInfo.dates) {
                        photo.setTakenDate(photoWithInfo.dates.taken);
                    }

                    if (matchingLicense) {
                        photo.setLicense(
                            matchingLicense.id,
                            matchingLicense.name,
                            matchingLicense.url
                        );
                    }

                    if (photoWithInfo.owner) {
                        photo.setUser(
                            photoWithInfo.owner.nsid,
                            photoWithInfo.owner.username,
                            photoWithInfo.owner.location,
                            photoWithInfo.owner.iconserver,
                            photoWithInfo.owner.iconfarm
                        );
                    }

                    if (photoWithInfo.location) {
                        const locality = photoWithInfo.location.locality && photoWithInfo.location.locality._content || '';
                        const county = photoWithInfo.location.county && photoWithInfo.location.county._content || '';
                        const region = photoWithInfo.location.region && photoWithInfo.location.region._content || '';
                        const country = photoWithInfo.location.country && photoWithInfo.location.country._content || '';
                        const neighbourhood = photoWithInfo.location.neighbourhood && photoWithInfo.location.neighbourhood._content || '';

                        photo.setLocation(
                            photoWithInfo.location.latitude,
                            photoWithInfo.location.longitude,
                            photoWithInfo.location.accuracy,
                            locality,
                            county,
                            region,
                            country,
                            neighbourhood
                        );
                    }
                })
            );
    }
}
