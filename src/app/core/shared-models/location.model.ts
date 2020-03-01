export class LocationModel {
    latitude: string;
    longitude: string;
    accuracy: string;
    locality: string;
    county: string;
    region: string;
    country: string;
    neighbourhood: string;

    constructor(
        latitude: string,
        longitude: string,
        accuracy: string,
        locality: string,
        county: string,
        region: string,
        country: string,
        neighbourhood: string
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        this.locality = locality;
        this.county = county;
        this.region = region;
        this.country = country;
        this.neighbourhood = neighbourhood;
    }
}
