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


// import React from "react";


// const audioController = () => {
//     return (

//     )
// }

// export default audioController;