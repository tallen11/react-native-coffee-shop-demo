import React from 'react';

import {
    View, StyleSheet,
} from 'react-native';

interface Props {
    readonly rating: number;
}

export default function Rating(props: Props) {

    function renderDots(): JSX.Element[] {
        const dots = [];
        for (let i = 0; i < 5; ++i) {
            const inside = Math.floor(props.rating) < i + 1;
            dots.push(
                <View key={i} style={[Styles.dot, {
                    marginLeft: i > 0 ? 6 : 0,
                    backgroundColor: inside ? 'black' : 'white',
                    opacity: inside ? 0.15 : 0.8,
                }]} />
            );
        }

        return dots;
    }

    return (
        <View style={Styles.container}>
            {renderDots()}
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    dot: {
        width: 6,
        height: 15,
        borderRadius: 2,
    },
});
