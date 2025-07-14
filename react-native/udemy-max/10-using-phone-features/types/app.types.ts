export type Location = {
  latitude: number;
  longitude: number;
};

export type PlaceType = {
    title: string;
    imageUri: string;
    address: string;
    location: Location;
    id: string;
};