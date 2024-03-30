// play
export const play = async (playbackobj, uri) => {
    try {
        return await playbackobj.loadAsync({ uri: uri}, {shouldPlay: true})
    } catch (err) {
        console.log(err)
    }
}

// pause
export const pause = async (playbackobj) => {
    try {
        return await playbackobj.setStatusAsync({shouldPlay: false})
    } catch (err) {
        console.log(err)
    }
}

// resume
export const resume = async (playbackobj) => {
    try {
        return await playbackobj.playAsync()
    } catch (err) {
        console.log(err)
    }
}

// select another
export const playNext = async ( playbackobj, uri ) => {
    try {
        await playbackobj.stopAsync()
        await playbackobj.unloadAsync()
        return await play(playbackobj, uri)
    } catch (err) {
        console.log(err)
    }
}

// import React from "react";


// const audioController = () => {
//     return (

//     )
// }

// export default audioController;