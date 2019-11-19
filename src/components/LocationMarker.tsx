import React from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Fonts from '../style/Fonts';

interface Props {
    readonly onPress: () => void;
}

export default function LocationMarker(props: Props) {
    return (
        <TouchableOpacity style={Styles.container}
            onPress={() => props.onPress()}>
            <View style={Styles.topContainer}>
                <Text style={Styles.labelText}>{'C'}</Text>
            </View>

            <View style={Styles.bottom} />
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        shadowColor: 'black',
        marginBottom: 20,
        shadowOffset: { width: 0.0, height: 10.0 },
        shadowOpacity: 0.25,
        shadowRadius: 5.0,
        opacity: 0.8,
    },

    topContainer: {
        width: 30,
        height: 26,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FD866E',
    },

    labelText: {
        fontFamily: Fonts.black,
        fontSize: RFPercentage(2.1),
        color: 'white',
    },

    bottom: {
        width: 6,
        height: 8,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: '#FD866E',
    },
});
