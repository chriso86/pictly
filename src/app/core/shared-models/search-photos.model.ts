import {PhotoModel} from './photo.model';
import {BoundingBoxModel} from './bounding-box.model';

export class SearchPhotosModel {
    totalPhotos: number;
    boundingBox: BoundingBoxModel;
    photos: PhotoModel[];

    constructor(totalPhotos: number, photos: PhotoModel[]) {
        this.totalPhotos = totalPhotos;
        this.photos = photos;
    }

    setBoundingBox(boundingBox: BoundingBoxModel) {
        this.boundingBox = new BoundingBoxModel(
            boundingBox.getSouthWestLongitude(),
            boundingBox.getSouthWestLatitude(),
            boundingBox.getNorthEastLongitude(),
            boundingBox.getNorthEastLatitude()
        );
    }
}
