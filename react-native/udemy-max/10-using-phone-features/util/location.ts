import { Location } from "../types/app.types";

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

export function getMapPreview(lat: number, lng: number): string {
    const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lng},${lat}&zoom=15&marker=lonlat:${lng},${lat};color:%23ff0000;size:42;text:A&apiKey=${GEOAPIFY_API_KEY}`;
    return imagePreviewUrl;
}

export async function getAddressFromLocation(
    { latitude,
        longitude }: Location
): Promise<string> {
    const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }

    const data = await response.json();
    if (data.features.length === 0) {
        throw new Error('No address found for the given location');
    }
    return data.features[0].properties.formatted;
}
