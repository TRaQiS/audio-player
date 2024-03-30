import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from "../content/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import OptionModal from "../components/OptionModal";
import { Audio } from 'expo-av'
import { pause, play, resume } from "../misc/audioController";

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
    
    handleAudioPress = async (audio) => {
        const {soundObj, playbackobj, currentAudio, updateState} = this.context
        // console.log(audio)
        if (soundObj === null) {
            const playbackobj = new Audio.Sound()
            const status = await play(playbackobj, audio.uri)
            return updateState(this.context, { currentAudio: audio, playbackobj: playbackobj, soundObj: status } )
        }

        // pause
        if (soundObj.isLoaded && soundObj.isPlaying) {
            // audioController.pause()
            const status = await pause(playbackobj)
            return updateState(this.context, { soundObj: status } )
        }

        //resume

        if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
            const status = await resume(playbackobj)
            return updateState(this.context, { soundObj: status })
        }
    }

    rowRenderer = (type, item) => {
        // console.log(item)
        return <AudioListItem 
                    title={item.filename} 
                    duration={item.duration} 
                    onOptionPress= {() => {
                        this.currentItem = item;
                        this.setState({...this.state, optionModalVisible: true })
                    }}
                    onAudioPress={() => this.handleAudioPress(item)}
            />
    }

    render() {
        return <AudioContext.Consumer>
            {({dataProvider}) => {
                return (
                    <View style={{flex: 1}}>
                        {/* <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} /> */}
                        <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} />

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