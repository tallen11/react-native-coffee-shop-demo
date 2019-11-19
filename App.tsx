import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';

import Fonts from './src/style/Fonts';

import NavigationBar, { Screen } from './src/components/NavigationBar';

import CoffeesScreen from './src/components/screens/CoffeesScreen';
import LocationsScreen from './src/components/screens/LocationsScreen';

const App = () => {
    const screens: Screen[] = [
        { title: 'Coffees', detailContent: <CoffeesScreen /> },
        { title: 'Locations', detailContent: <LocationsScreen /> },
        { title: 'About Us', detailContent: <View /> },
        // { title: 'Black Gold', detailContent: <View /> },
    ];

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <NavigationBar screens={screens} />
        </>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
