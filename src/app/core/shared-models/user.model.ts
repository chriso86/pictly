export class UserModel {
    id: string;
    username: string;
    location: string;
    url: string;
    iconServer: string;
    iconFarm: number;
    profilePictureUrl: string;

    constructor(
        id: string,
        username: string,
        location: string,
        iconServer: string,
        iconFarm: number
    ) {
        this.id = id;
        this.username = username;
        this.location = location;
        this.iconServer = iconServer;
        this.iconFarm = iconFarm;

        this.url = `https://www.flickr.com/people/${id}`;

        if (iconFarm) {
            this.profilePictureUrl = `http://farm${iconFarm}.staticflickr.com/${iconServer}/buddyicons/${id}.jpg`;
        } else {
            this.profilePictureUrl = 'http://combo.staticflickr.com/pw/images/buddyicon03.png#187203063@N07';
        }
    }
}
