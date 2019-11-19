import React, { useState } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Fonts from '../style/Fonts';

import NavigationBarItem from './NavigationBarItem';

export interface Screen {
    readonly title: string;
    readonly detailContent: JSX.Element;
}

interface Props {
    readonly screens: Screen[];
}

// TODO: Credits: Coffee bean icons: <a target="_blank" href="/icons/set/coffee-beans-">Coffee Beans icon</a> by <a target="_blank" href="https://icons8.com">Icons8</a>
// TODO: Menu icon: <a target="_blank" href="/icons/set/menu-2--v1">Menu Vertical icon</a> by <a target="_blank" href="https://icons8.com">Icons8</a>
export default function NavigationBar(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function itemPressed(index: number) {
        if (index === selectedIndex) {
            return;
        }

        setSelectedIndex(index);
    }

    return (
        <View style={Styles.container}>
            <LinearGradient colors={['#FFF8F6', 'white']} style={Styles.menuContainer}>
                <TouchableOpacity style={Styles.menuButtonContainer}>
                    <Image style={Styles.icon}
                        source={require('../../assets/menu.png')}
                        resizeMode={'contain'} />
                </TouchableOpacity>

                <View style={Styles.menuItemsContainer}>
                    {props.screens.map((s, i) => <NavigationBarItem
                                                    key={i}
                                                    title={s.title}
                                                    selected={i === selectedIndex}
                                                    onPress={() => itemPressed(i)} />)}
                </View>
            </LinearGradient>

            <LinearGradient colors={['white', '#FFF8F6']} style={Styles.dividerLine} />

            <View style={Styles.detailContainer}>
                {props.screens[selectedIndex].detailContent}
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },

    menuContainer: {
        flex: 1,
        backgroundColor: 'lightgray',
    },

    menuButtonContainer: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 20,
    },

    icon: {
        width: '45%',
        height: '45%',
        tintColor: '#1F0D3C',
        opacity: 0.75,
    },

    menuItemsContainer: {
        flex: 8,
    },

    dividerLine: {
        width: 2,
    },

    detailContainer: {
        flex: 3.1,
    },
});
