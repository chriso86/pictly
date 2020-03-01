import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BoundingBoxModel} from '../shared-models/bounding-box.model';
import {Observable} from 'rxjs';
import {PhotoModel} from '../shared-models/photo.model';
import {SearchPhotosDto} from './search-photos.dto';
import {LicenseModel} from '../shared-models/license.model';
import {GetLicensesDto} from './get-licenses.dto';
import {SearchPhotosModel} from '../shared-models/search-photos.model';
import {PhotoWithInfoDto} from './photo-with-info.dto';
import {TagModel} from '../shared-models/tag.model';

@Injectable({providedIn: 'root'})
export class FlickrGateway {
    // Public properties
    filckrEndpoint = 'https://api.flickr.com/services/rest/';
    key = '95b1ce546baf1db8278e0c99ccce30a8';
    responseFormat = 'json';
    noJsonCallback = 1;


    constructor(private http: HttpClient) {
    }


    // Public methods
    public getAllLicenses(): Observable<LicenseModel[]> {
        const options = {
            method: 'flickr.photos.licenses.getInfo',
            api_key: this.key,
            format: this.responseFormat,
            nojsoncallback: this.noJsonCallback.toString()
        };

        return this.http.get<GetLicensesDto>(this.filckrEndpoint, {params: options})
            .pipe(
                map((response: GetLicensesDto) => {
                    return response.licenses.license.map((license: LicenseModel) => {
                        return new LicenseModel(
                            license.id,
                            license.name,
                            license.url
                        );
                    });
                })
            );
    }

    public getPhotosForBoundedLocation(
        bounds: BoundingBoxModel,
        itemsPerPage: number,
        pageNumber: number,
        tags: TagModel[] = []
    ): Observable<SearchPhotosModel> {
        const options: any = {
            method: 'flickr.photos.search',
            api_key: this.key,
            per_page: itemsPerPage.toString(),
            page: pageNumber.toString(),
            format: this.responseFormat,
            nojsoncallback: this.noJsonCallback.toString(),
            bbox: bounds.getSouthWest().lng().toString() + ','
                + bounds.getSouthWest().lat().toString() + ','
                + bounds.getNorthEast().lng().toString() + ','
                + bounds.getNorthEast().lat().toString()
        };

        if (tags && tags.length) {
            options.tags = tags.map(tag => tag.name).join(',');
        }

        return this.http
            .get<SearchPhotosDto>(this.filckrEndpoint, {params: options})
            .pipe(
                map((response: SearchPhotosDto) => {
                    if (response.stat === 'ok') {
                        return new SearchPhotosModel(
                            Number(response.photos.total),
                            response.photos.photo.map((photo: any) => {
                                return new PhotoModel(
                                    photo.id,
                                    `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                                    photo.title,
                                    photo.secret
                                );
                            })
                        );
                    } else {
                        throw new Error(response.message);
                    }
                })
            );
    }

    public getDetailsForPhoto(photo: PhotoModel): Observable<PhotoWithInfoDto> {
        const options = {
            method: 'flickr.photos.getInfo',
            api_key: this.key,
            photo_id: photo.id,
            secret: photo.secret,
            format: this.responseFormat,
            nojsoncallback: this.noJsonCallback.toString()
        };

        return this.http.get<PhotoWithInfoDto>(this.filckrEndpoint, {params: options});
    }
}
