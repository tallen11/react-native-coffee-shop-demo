import React, { useState, useLayoutEffect } from 'react';

import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    Linking,
} from 'react-native';

import MapView, { Marker, MapViewAnimated } from 'react-native-maps';
import { RFPercentage } from 'react-native-responsive-fontsize';

import ScreenHeader from '../ScreenHeader';
import LocationMarker from '../LocationMarker';
import Fonts from '../../style/Fonts';
import Location from '../../model/Location';

const Locations: Location[] = [
    { name: 'Cambridge, MA', coordinates: { latitude: 42.376554, longitude: -71.100769 }},
    { name: 'Dorchester, MA', coordinates: { latitude: 42.301944, longitude: -71.108322 }},
    { name: 'Braintree, MA', coordinates: { latitude: 42.241735, longitude: -70.997086 }},
];

const headerScale = new Animated.Value(0.95);
const headerOpacity = new Animated.Value(0.0);
const headerYOffset = new Animated.Value(20.0);

const mapScale = new Animated.Value(0.95);
const mapOpacity = new Animated.Value(0.0);
const mapYOffset = new Animated.Value(20.0);

export default function LocationsScreen() {
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

    const locationScale = new Animated.Value(0.95);
    const locationOpacity = new Animated.Value(0.0);
    const locationYOffset = new Animated.Value(20.0);

    useLayoutEffect(() => {
        Animated.parallel([
            Animated.timing(headerOpacity, {
                toValue: 1.0,
                duration: 200.0,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.spring(headerScale, {
                toValue: 1.0,
                mass: 1,
                useNativeDriver: true,
            }),
            Animated.spring(headerYOffset, {
                toValue: 0.0,
                mass: 1,
                useNativeDriver: true,
            }),
            Animated.timing(mapOpacity, {
                toValue: 1.0,
                duration: 200.0,
                easing: Easing.inOut(Easing.cubic),
                delay: 100.0,
                useNativeDriver: true,
            }),
            Animated.spring(mapScale, {
                toValue: 1.0,
                mass: 1,
                delay: 100.0,
                useNativeDriver: true,
            }),
            Animated.spring(mapYOffset, {
                toValue: 0.0,
                mass: 1,
                delay: 100.0,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    
    useLayoutEffect(() => {
        Animated.parallel([
            Animated.timing(locationOpacity, {
                toValue: 1.0,
                duration: 200.0,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.spring(locationScale, {
                toValue: 1.0,
                mass: 1,
                useNativeDriver: true,
            }),
            Animated.spring(locationYOffset, {
                toValue: 0.0,
                mass: 1,
                useNativeDriver: true,
            }),
        ]).start();
    }, [selectedLocation]);

    function markerPressed(location: Location) {
        setSelectedLocation(location);
    }

    function getDirectionsPressed(location: Location) {
        Linking.openURL(`maps:0,0?q=${location.coordinates.latitude},${location.coordinates.longitude}`);
    }

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView style={Styles.safeContainer}>
                <ScreenHeader
                    title={'Our Locations'}
                    subtitle={'Where to find us'}
                    yOffset={headerYOffset}
                    scale={headerScale}
                    opacity={headerOpacity} />

                <Animated.View style={[Styles.mapContainer, {
                    transform: [
                        { translateY: mapYOffset },
                        { scale: mapScale },
                    ],
                    opacity: mapOpacity,
                }]}>
                    <MapView style={Styles.map}
                        region={{
                            latitude: 42.361145,
                            longitude: -71.057083,
                            latitudeDelta: 0.3,
                            longitudeDelta: 0.3,
                        }}>
                        {Locations.map((loc, i) => (
                            <Marker key={i}
                                coordinate={loc.coordinates}>
                                <LocationMarker onPress={() => markerPressed(loc)} />
                            </Marker>
                        ))}
                    </MapView>
                </Animated.View>

                {selectedLocation != undefined && <Animated.View style={[Styles.locationContainer, {
                    transform: [
                        { translateY: locationYOffset },
                        { scale: locationScale },
                    ],
                    opacity: locationOpacity,
                }]}>
                    <View style={Styles.locationHeaderContainer}>
                        <Text style={Styles.locationNameText}>{selectedLocation!.name}</Text>
                        <Text style={Styles.locationHoursText}>{'7 AM to 8 PM'}</Text>
                    </View>

                    <TouchableOpacity style={Styles.getDirectionsButton}
                        onPress={() => getDirectionsPressed(selectedLocation)}>
                        <Text style={Styles.getDirectionsText}>{'Get Directions'}</Text>
                    </TouchableOpacity>
                </Animated.View>}
            </ScrollView>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    safeContainer: {
        flex: 1,
        paddingLeft: 20.0,
        paddingRight: 20.0,
        paddingTop: 20.0,
    },

    mapContainer: {
        width: '100%',
        height: 250,
        shadowColor: 'black',
        shadowOffset: { width: 0.0, height: 30.0 },
        shadowOpacity: 0.15,
        shadowRadius: 12.0,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10.0,
    },

    locationContainer: {
        width: '100%',
        height: 200,
        marginTop: 40,
        padding: 20.0,
        justifyContent: 'space-between',
        borderRadius: 10.0,
        shadowColor: 'black',
        shadowOffset: { width: 0.0, height: 30.0 },
        shadowOpacity: 0.15,
        shadowRadius: 12.0,
        backgroundColor: '#4cdbff',
    },

    locationHeaderContainer: {
        width: '100%',
    },

    locationNameText: {
        fontFamily: Fonts.bold,
        fontSize: RFPercentage(3.8),
        color: 'white',
    },

    locationHoursText: {
        fontFamily: Fonts.medium,
        fontSize: RFPercentage(2.4),
        color: 'white',
        opacity: 0.75,
    },

    getDirectionsButton: {
        alignSelf: 'flex-end',
    },

    getDirectionsText: {
        fontFamily: Fonts.semiBold,
        fontSize: RFPercentage(3),
        color: 'white',
    },
});
