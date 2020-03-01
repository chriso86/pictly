export interface PhotoWithInfoDto {
    photo: {
        description: {
            _content: string;
        },
        dateuploaded: string;
        license: string;
        owner: {
            nsid: string,
            username: string,
            location: string,
            iconserver: string,
            iconfarm: number
        };
        dates: {
            taken: string;
        },
        location: {
            latitude: string,
            longitude: string,
            accuracy: string
            locality: {
                _content: string;
            },
            county: {
                _content: string;
            },
            region: {
                _content: string;
            },
            country: {
                _content: string;
            },
            neighbourhood: {
                _content: string;
            }
        };
    };
    stat: string;
    message?: string;
}
