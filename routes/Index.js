import React, { useState } from 'react'
import { MainStackNav } from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';

function MainRoot() {
    // const auth = useSelector(state => state.auth);
    // console.log(auth);
    return (

        <NavigationContainer>
            <MainStackNav />
        </NavigationContainer>

    )
}

export default MainRoot
