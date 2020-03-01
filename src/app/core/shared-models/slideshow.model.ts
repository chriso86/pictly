import {PhotoModel} from './photo.model';

export class SlideshowModel {
    // Public properties
    photos: PhotoModel[] = [];
    selectedPhoto: PhotoModel;


    constructor(photos: PhotoModel[], selectedPhoto: PhotoModel) {
        this.photos = photos;
        this.selectedPhoto = selectedPhoto;
    }


    // Public methods
    public selectNextPhoto() {
        this.validateModel();

        const currentPhotoIndex = this.photos.indexOf(this.selectedPhoto);

        if (currentPhotoIndex !== (this.photos.length - 1)) {
            this.setSelectedPhoto(this.photos[currentPhotoIndex + 1]);
        }
    }

    public selectPreviousPhoto() {
        this.validateModel();

        const currentPhotoIndex = this.photos.indexOf(this.selectedPhoto);

        if (currentPhotoIndex > 0) {
            this.setSelectedPhoto(this.photos[currentPhotoIndex - 1]);
        }
    }

    public setSelectedPhoto(photo: PhotoModel) {
        this.selectedPhoto = photo;
    }


    // Private methods
    private validateModel() {
        if (!this.selectedPhoto) {
            if (!this.photos.length) {
                throw new Error('There are no photos available, therefore no previous photo can be set');
            }

            this.selectedPhoto = this.photos[0]; // Fail over to first item in array
        }
    }
}
