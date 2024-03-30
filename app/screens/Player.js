import React from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import color from "../misc/color";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton.js'

const {width} = Dimensions.get("window")

const Player = () => {
    return <View style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.audioCount}>1 / 99</Text>
            <View style={styles.midBannerContainer}>
                <MaterialCommunityIcons name="music-circle" size={300} color={color.ACTIVE_BG} />
            </View>
            <View style={styles.audioPlayerContainer}>
                <Text numberOfLines={1} style={styles.audioTitle}>Audio File Name</Text>
                <Slider
                    style={{width: width, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG}
                />
                <View style={styles.audioControllers}>
                    <PlayerButton iconType='PREV' />
                    <PlayerButton 
                        onPress={() => {
                            // 
                        }}
                        style={{marginHorizontal: 15}} iconType='PLAY' />
                    <PlayerButton iconType='NEXT' />
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: color.FONT_LIGHT,
        fontSize: 14,

    },
    midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioTitle: {
        fontSize: 16,
        color: color.FONT_MEDIUM,
        padding: 20
    },
    audioControllers: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    }
})

export default Player;