import React from 'react';

import {
    Animated,
    Text,
    StyleSheet,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Fonts from '../style/Fonts';

interface Props {
    readonly title: string;
    readonly subtitle: string;
    readonly yOffset?: Animated.Value | number;
    readonly scale?: Animated.Value | number;
    readonly opacity?: Animated.Value | number;
}

export default function ScreenHeader(props: Props) {
    return (
        <Animated.View style={[Styles.container, {
            transform: [
                { translateY: props.yOffset || 0.0 },
                { scale: props.scale || 1.0 },
            ],
            opacity: props.opacity || 1.0,
        }]}>
            <Text style={Styles.titleText}>{props.title}</Text>
            <Text style={Styles.subtitleText}>{props.subtitle}</Text>
        </Animated.View>
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
    },

    titleText: {
        // paddingLeft: 20,
        // paddingTop: 20,
        fontFamily: Fonts.bold,
        fontSize: RFPercentage(6),
        color: '#1F0D3C',
    },

    subtitleText: {
        // paddingLeft: 20,
        fontFamily: Fonts.medium,
        fontSize: RFPercentage(2.5),
        color: '#555555',
    },
});
