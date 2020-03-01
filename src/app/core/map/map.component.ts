import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PositionModel} from '../shared-models/position.model';
import {BehaviorSubject} from 'rxjs';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {BoundingBoxModel} from '../shared-models/bounding-box.model';
import {PhotoModel} from '../shared-models/photo.model';
import {SearchPhotosModel} from '../shared-models/search-photos.model';

@Component({
    selector: 'pictly-map',
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, AfterViewInit {
    // Public properties
    center: google.maps.LatLngLiteral;
    markerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];


    // Input parameters
    @Input() position: BehaviorSubject<PositionModel> = new BehaviorSubject<PositionModel>(new PositionModel(24, 12));
    @Input() boundingBox: BehaviorSubject<BoundingBoxModel> = new BehaviorSubject<BoundingBoxModel>(null);
    @Input() photosModel: BehaviorSubject<SearchPhotosModel> = new BehaviorSubject<SearchPhotosModel>(null);


    // Element references
    @ViewChild('map') map: GoogleMap;
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;


    // Lifecycle hooks
    ngOnInit(): void {
        // Register subscription to the search location change on map data model
        this.position.subscribe(newPosition => {

            this.updateCenterData(newPosition.lat, newPosition.lng);

        });

        if (navigator.geolocation) {

            this.setCurrentPosition();

        }

        this.registerPhotosListener();
    }

    ngAfterViewInit(): void {
        this.map.idle.subscribe(() => {
            const bounds = this.map.getBounds();
            const boundingBox = new BoundingBoxModel(
                bounds.getSouthWest().lng(),
                bounds.getSouthWest().lat(),
                bounds.getNorthEast().lng(),
                bounds.getNorthEast().lat()
            );

            this.boundingBox.next(boundingBox);
        });
    }


    // Public methods
    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }


    // Private methods
    private registerPhotosListener(): void {
        this.photosModel.subscribe((searchPhotosModel: SearchPhotosModel) => {
            this.markerPositions = searchPhotosModel.photos
                .filter((photo: PhotoModel) => !!photo.location)
                .map((photo: PhotoModel) => {
                    return {
                        lat: Number(photo.location.latitude),
                        lng: Number(photo.location.longitude)
                    };
                });

            console.log(this.markerPositions);
        });
    }

    private setCurrentPosition(): void {
        navigator.geolocation
            .getCurrentPosition((position: Position) => {

                this.updateCenterData(position.coords.latitude, position.coords.longitude);

            }, (error: PositionError) => {
                throw new Error('Could not find your location.');
            }, {enableHighAccuracy: true, maximumAge: (60 * 1000), timeout: (5 * 1000)});
    }

    private updateCenterData(latitude: number, longitude: number): void {
        this.center = {
            lat: latitude,
            lng: longitude
        };
    }
}
