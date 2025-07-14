import { Place } from "../models/place"
import { Location } from "./app.types"

export type RootStackParamList = {
    AllPlaces: { Place: Place }
    AddPlace: undefined
    Map: { onPickLocation: (location: Location) => void }
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}