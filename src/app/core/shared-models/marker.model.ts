import {MapMarker} from '@angular/google-maps';

export class MarkerModel {
    title: string;
    user: string;
    url: string;
    location: google.maps.LatLngLiteral;
}
