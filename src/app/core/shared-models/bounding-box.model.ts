export class BoundingBoxModel extends google.maps.LatLngBounds {
    constructor(
        southWestLongitude: number,
        southWestLatitude: number,
        northEastLongitude: number,
        northEastLatitude: number
    ) {
        const sw = new google.maps.LatLng(southWestLatitude, southWestLongitude);
        const ne = new google.maps.LatLng(northEastLatitude, northEastLongitude);

        super(sw, ne);
    }

    public equalTo(boundingBox: BoundingBoxModel): boolean {
        return this.getSouthWestLongitude(boundingBox) === this.getSouthWestLongitude(this)
            && this.getSouthWestLatitude(boundingBox) === this.getSouthWestLatitude(this)
            && this.getNorthEastLongitude(boundingBox) === this.getNorthEastLongitude(this)
            && this.getNorthEastLatitude(boundingBox) === this.getNorthEastLatitude(this);
    }

    public getSouthWestLongitude(boundingBox: BoundingBoxModel = this): number {
        return boundingBox.getSouthWest().lng();
    }

    public getSouthWestLatitude(boundingBox: BoundingBoxModel = this): number {
        return boundingBox.getSouthWest().lat();
    }

    public getNorthEastLongitude(boundingBox: BoundingBoxModel = this): number {
        return boundingBox.getNorthEast().lng();
    }

    public getNorthEastLatitude(boundingBox: BoundingBoxModel = this): number {
        return boundingBox.getNorthEast().lat();
    }
}
