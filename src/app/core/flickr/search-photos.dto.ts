import {PhotoDto} from './photo.dto';

export interface SearchPhotosDto {
    stat: string;
    message?: string;
    photos: {
        page: number;
        pages: number;
        perpage: number;
        total: string;
        photo: PhotoDto[];
    };
}
