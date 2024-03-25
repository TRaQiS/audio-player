import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen name="AudioList" component={AudioList} options={{
            tabBarIcon: ({color, size}) => {
                return <MaterialIcons name="headset" size={size} color={color}/>
            }
        }}/>
        <Tab.Screen name="Player" component={Player} options={{
            tabBarIcon: ({color, size}) => {
                return <Entypo name="folder-music" size={24} color="black" />
            }
        }}/>
        <Tab.Screen name="PlayList" component={PlayList} options={{
            tabBarIcon: ({color, size}) => {
                return <MaterialIcons name="library-music" size={size} color={color}/>
            }
        }}/>

    </Tab.Navigator>
}

export default AppNavigator;