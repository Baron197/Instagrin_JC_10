import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import OtherProfileHome from './OtherProfileHome';
import PostDetailOtherProfileHome from './PostDetailOtherProfileHome';

export default createStackNavigator(
    {
        Home: {
            screen: Home
        },
        OtherProfile: {
            screen: OtherProfileHome
        },
        PostDetailOtherProfile: {
            screen: PostDetailOtherProfileHome
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);
