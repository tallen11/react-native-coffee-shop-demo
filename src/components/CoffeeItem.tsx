import React, { useEffect } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

import Fonts from '../style/Fonts';
import Coffee from '../model/Coffee';

import Rating from './Rating';

interface Props {
    readonly coffee: Coffee;
}

export default function CoffeeItem(props: Props) {
    const opacity = new Animated.Value(0.0);
    const scale = new Animated.Value(0.95);
    const yOffset = new Animated.Value(20.0);

    useEffect(() => {
        const duration = 400.0;
        const easing = Easing.inOut(Easing.cubic);
        const delay = 100.0;

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
                // duration: duration,
                // easing: easing,
                mass: 1,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(yOffset, {
                toValue: 0.0,
                // duration: duration,
                // easing: easing,
                mass: 1,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, scale, yOffset]);

    return (
        <Animated.View style={[Styles.container, {
            transform: [
                { translateY: yOffset },
                { scale: scale },
            ],
            opacity: opacity,
        }]}>
            <View style={[Styles.innerContainer, { backgroundColor: props.coffee.color }]}>
                <View style={Styles.headerContainer}>
                    <Text style={Styles.nameText}>{props.coffee.name}</Text>
                    <Text style={Styles.descriptionText}>{props.coffee.description}</Text>
                </View>

                <View style={Styles.bottomInfoContainer}>
                    <Rating rating={props.coffee.rating} />
                    <Text style={Styles.roastTypeText}>{`${props.coffee.roastType} roast`}</Text>
                </View>
            </View>
        </Animated.View>
    );
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 230,
        paddingTop: 15.0,
        paddingBottom: 25.0,
    },

    innerContainer: {
        width: '100%',
        height: '100%',
        padding: 20.0,
        borderRadius: 10.0,
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: { width: 0.0, height: 30.0 },
        shadowOpacity: 0.15,
        shadowRadius: 12.0,
    },

    headerContainer: {
        width: '100%',
    },

    nameText: {
        fontFamily: Fonts.extraBold,
        fontSize: RFPercentage(3.5),
        // color: '#1F0D3C',
        color: 'white',
    },

    bottomInfoContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    roastTypeText: {
        // alignSelf: 'flex-end',
        fontFamily: Fonts.medium,
        fontSize: RFPercentage(2.4),
        color: 'white',
        opacity: 0.75,
    },

    descriptionText: {
        paddingTop: 5,
        fontFamily: Fonts.medium,
        fontSize: RFPercentage(2.2),
        color: 'white',
        opacity: 0.8,
    },
});
