import React, { useEffect } from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Fonts from '../../style/Fonts';
import Coffee from '../../model/Coffee';
import RoastType from '../../model/RoastType';
import CoffeeItem from '../CoffeeItem';
import ScreenHeader from '../ScreenHeader';

const Coffees: Coffee[] = [
    { name: 'Apollo', color: '#FCC07E', darkColor: '#de8d57', roastType: RoastType.Light, rating: 4.5, description: 'A floral, bright and citrusy Ethiopian coffee.' },
    { name: 'Big Trouble', color: '#4cdbff', darkColor: '#3289c7', roastType: RoastType.Medium, rating: 5.0, description: 'Nutty, caramel flavors and low acidity.' },
    { name: 'Fast Forward', color: '#FD866E', darkColor: '#cf4646', roastType: RoastType.Light, rating: 3.5, description: 'Simple, light and delicious.' },
    { name: 'Forty-Six', color: '#FCC07E', darkColor: '#de8d57', roastType: RoastType.Dark, rating: 4.0, description: 'A complex, clean, sweet, smoky and nuanced dark roast.' },
];

export default function CoffeesScreen() {
    const opacity = new Animated.Value(0.0);
    const scale = new Animated.Value(0.95);
    const yOffset = new Animated.Value(20.0);

    useEffect(() => {
        const duration = 200.0;
        const easing = Easing.inOut(Easing.cubic);
        const delay = 0.0;

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1.0,
                duration: duration,
                easing: easing,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1.0,
                mass: 1,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(yOffset, {
                toValue: 0.0,
                mass: 1,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, scale, yOffset]);

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView style={Styles.safeContainer}
                showsVerticalScrollIndicator={false}>
                <ScreenHeader
                    title={'Our Coffees'}
                    subtitle={'Delicious, artisinal roasts'}
                    yOffset={yOffset}
                    scale={scale}
                    opacity={opacity} />

                {Coffees.map(coffee => <CoffeeItem
                                            key={coffee.name}
                                            coffee={coffee} />)}
                <View style={Styles.spacer} />
            </ScrollView>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    safeContainer: {
        flex: 1,
        paddingLeft: 20.0,
        paddingRight: 20.0,
        paddingTop: 20.0,
    },

    spacer: {
        width: '100%',
        height: 40,
    },
});
