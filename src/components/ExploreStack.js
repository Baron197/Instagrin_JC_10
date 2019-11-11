import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Explore from './Explore';
import PostDetailExplore from './PostDetailExplore';

export default createStackNavigator(
    {
        Explore: {
            screen: Explore
        },
        PostDetailExplore: {
            screen: PostDetailExplore
        }
    },
    {
        initialRouteName: 'Explore',
        headerMode: 'none'
    }
);
