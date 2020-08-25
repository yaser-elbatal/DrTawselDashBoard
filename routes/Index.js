import React, { useState } from 'react'
import MainStackNav, { DrawerNAv } from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';

function MainRoot() {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    AsyncStorage.setItem('tokenn', token)
    return (

        <NavigationContainer>

            {
                auth.user !== null ?
                    <DrawerNAv />
                    :
                    <MainStackNav />

            }



        </NavigationContainer>

    )
}

export default MainRoot
