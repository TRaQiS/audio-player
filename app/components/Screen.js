import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";

const Screen = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.APP_BG,
        paddingTop: StatusBar.currentHeight,
    }
})

export default Screen;