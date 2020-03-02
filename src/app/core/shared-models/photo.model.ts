import {LicenseModel} from './license.model';
import {UserModel} from './user.model';
import {LocationModel} from './location.model';

export class PhotoModel {
    id: string;
    url: string;
    title: string;
    description: string;
    secret: string;
    dateUploaded: Date;
    dateTaken: Date;
    license: LicenseModel;
    user: UserModel;
    location: LocationModel;

    constructor(
        id: string,
        url: string,
        title: string,
        secret: string
    ) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.secret = secret;
    }

    public setLicense(
        id: string,
        name: string,
        url: string
    ): void {
        this.license = new LicenseModel(id, name, url);
    }

    public setUser(
        id: string,
        username: string,
        location: string,
        iconServer: string,
        iconFarm: number
    ): void {
        this.user = new UserModel(
            id,
            username,
            location,
            iconServer,
            iconFarm
        );
    }

    public setLocation(
        latitude: string,
        longitude: string,
        accuracy: string,
        locality: string,
        county: string,
        region: string,
        country: string,
        neighbourhood: string
    ): void {
        this.location = new LocationModel(
            latitude,
            longitude,
            accuracy,
            locality,
            county,
            region,
            country,
            neighbourhood
        );
    }

    public setUploadDate(dateUploaded: string) {
        this.dateUploaded = new Date(Number(dateUploaded));
    }

    public setTakenDate(dateTaken: string) {
        this.dateTaken = new Date(dateTaken);
    }
}
