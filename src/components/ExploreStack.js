import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Explore from './Explore';
import PostDetailExplore from './PostDetailExplore';
import OtherProfileExplore from './OtherProfileExplore';
import PostDetailOtherProfileExplore from './PostDetailOtherProfileExplore';

export default createStackNavigator(
    {
        Explore: {
            screen: Explore
        },
        PostDetailExplore: {
            screen: PostDetailExplore
        },
        OtherProfile: {
            screen: OtherProfileExplore
        },
        PostDetailOtherProfile: {
            screen: PostDetailOtherProfileExplore
        }
    },
    {
        initialRouteName: 'Explore',
        headerMode: 'none'
    }
);
