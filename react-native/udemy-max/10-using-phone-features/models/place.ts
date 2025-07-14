import { Location } from "../types/app.types";

export class Place {

    constructor(
        public title: string,
        public imageUri: string,
        public address: string,
        public location: Location,
        public id: string = new Date().toString() + Math.random().toString()
    ) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
        this.id = id;
    }

}

