import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from "../content/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import OptionModal from "../components/OptionModal";
import { Audio } from 'expo-av'
import { pause, play, playNext, resume } from "../misc/audioController";

export class AudioList extends Component {
    static contextType = AudioContext

    constructor(props) {
        super(props);
        this.state = {
            optionModalVisible: false
        };
        this.currentItem = {

        }
    }

    layoutProvider = new LayoutProvider(i => 'audio', (type, dim) => {
        switch(type) {
            case 'audio': 
                dim.width = Dimensions.get("window").width
                dim.height = 70;
                break;
            default:
                dim.width = 0;
                dim.height = 0;
        }

    })
    
    onPlaybackStatusUpdate = async playbackStatus => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            this.context.updateState(this.context, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis
            })
        }

        if (playbackStatus.didJustFinish) {
            const nextAudioIndex = this.context.currentAudioIndex + 1
            const audio = this.context.audioFiles[nextAudioIndex]
            const status = await playNext(this.context.playbackobj, audio.uri)
            this.context.updateState(this.context, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex
            })
        }
    }

    handleAudioPress = async (audio) => {
        const {soundObj, playbackobj, currentAudio, updateState, audioFiles} = this.context
        // console.log(audio)
        if (soundObj === null) {
            const playbackobj = new Audio.Sound()
            const status = await play(playbackobj, audio.uri)
            const index = audioFiles.indexOf(audio)
            updateState(this.context, { currentAudio: audio, playbackobj: playbackobj, soundObj: status, isPlaying: true, currentAudioIndex: index } );
            return playbackobj.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        }

        // pause
        if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
            // audioController.pause()
            const status = await pause(playbackobj)
            return updateState(this.context, { soundObj: status, isPlaying: false } )
        }

        //resume
        if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
            const status = await resume(playbackobj)
            return updateState(this.context, { soundObj: status, isPlaying: true })
        }

        // select other
        if (soundObj.isLoaded && currentAudio.id !== audio.id) {
            const status = await playNext(playbackobj, audio.uri)
            const index = audioFiles.indexOf(audio)
            return updateState(this.context, {currentAudio: audio, soundObj: status, isPlaying: true, currentAudioIndex: index })
        }
    }

    rowRenderer = (type, item, index, extendedState) => {
        // console.log(item)
        return <AudioListItem 
                    title={item.filename} 
                    duration={item.duration} 
                    isPlaying={extendedState.isPlaying}
                    activeListItem={this.context.currentAudioIndex === index}
                    onOptionPress= {() => {
                        this.currentItem = item;
                        this.setState({...this.state, optionModalVisible: true })
                    }}
                    onAudioPress={() => this.handleAudioPress(item)}
            />
    }

    render() {
        return <AudioContext.Consumer>
            {({dataProvider, isPlaying}) => {
                return (
                    <View style={{flex: 1}}>
                        {/* <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} /> */}
                        <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} extendedState={{isPlaying}} />

                        {/* <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} /> */}
                        <OptionModal 
                            currentItem={this.currentItem} 
                            onPlayPress={() => console.log('Play audio')}
                            onPlayListPress={() => console.log('Add to playlist')} 
                            onClose={() => this.setState({...this.state, optionModalVisible: false})} 
                            visible={this.state.optionModalVisible} />
                    </View>
                ) 
                
            }}
        </AudioContext.Consumer>
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})


export default AudioList;