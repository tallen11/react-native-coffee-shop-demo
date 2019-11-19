import { LatLng } from 'react-native-maps';

export default interface Location {
    readonly name: string;
    readonly coordinates: LatLng;
}