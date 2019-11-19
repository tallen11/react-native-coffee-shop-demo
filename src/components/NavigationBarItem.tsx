import React, { useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';

import Fonts from '../style/Fonts';

interface Props {
    readonly title: string;
    readonly selected: boolean;
    readonly onPress: () => void;
}

export default function NavigationBarItem(props: Props) {
    const dotOffset = new Animated.Value(-8.0);

    useEffect(() => {
        Animated.timing(dotOffset, {
            toValue: 0.0,
            duration: 200.0,
            useNativeDriver: true,
        }).start();
    }, [props.selected]);

    return (
        <View style={Styles.menuItem}>
            <View style={Styles.dotContainer}>
                {props.selected && <Animated.View style={[Styles.dot, {
                    transform: [ { translateX: dotOffset }, ],
                }]} />}
            </View>
            <TouchableOpacity style={Styles.titleContainer}
                onPress={props.onPress}>
                <Text style={[Styles.menuItemTitleText, {
                    opacity: props.selected ? 1.0 : 0.3,
                }]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create({
    menuItem: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
    },

    dotContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    dot: {
        width: 8,
        height: 16,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: '#1F0D3C',
    },

    titleContainer: {
        flex: 5,
        height: '100%',
        justifyContent: 'center',
    },

    menuItemTitleText: {
        flexWrap: 'nowrap',
        fontFamily: Fonts.bold,
        fontSize: RFPercentage(2.75),
        color: '#1F0D3C',
        textAlign: 'center',
        transform: [ { rotate: '-90deg' } ],
    },
});
