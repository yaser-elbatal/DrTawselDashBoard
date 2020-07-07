import React, { useState } from 'react'
import { UserProvider } from './UserContext';
import MainStackNav, { DrawerNAv } from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

function MainRoot() {
    const [Token, setToken] = useState("");

    const setLogin = () => {
        setToken('yasser');

    };
    const setLogout = () => {
        setToken("");
    };

    return (
        <UserProvider value={{ setLogin, setLogout }}>
            <NavigationContainer>

                {
                    Token ?


                        <DrawerNAv />
                        :
                        <MainStackNav />


                }
            </NavigationContainer>

        </UserProvider>
    )
}

export default MainRoot
