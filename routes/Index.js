import React, { useState } from 'react'
import MainStackNav, { DrawerNAv } from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function MainRoot() {
    const auth = useSelector(state => state.auth);
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
