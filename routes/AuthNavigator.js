import 'react-native-gesture-handler';
import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';





import Slider from '../Components/Start/SwipeBegin';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import AccountConfirm from '../Components/Auth/AccountConfirm';
import ForgetPass from '../Components/Auth/ForgetPass';
import NewPassword from '../Components/Auth/NewPassword';
import HomePage from '../Components/Home/HomePage';
import CustomDrawerMenue from '../Components/Home/CustomDrawerMenue';
import Colors from '../consts/Colors';
import { Dimensions } from 'react-native';
import Settings from '../Components/DrawerComponent/Settings/Settings';
import Lang from '../Components/DrawerComponent/Settings/Lang';
import myProfil from '../Components/Home/myProfil';
import EditProfile from '../Components/Home/EditProfile';


const Stack = createStackNavigator();

export default function MainStackNav() {

    return (
        <Stack.Navigator initialRouteName="Home" headerMode='none'>
            <Stack.Screen name="Home" component={Slider} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="AccConfrm" component={AccountConfirm} />
            <Stack.Screen name="ForgetPass" component={ForgetPass} />
            <Stack.Screen name="NewPass" component={NewPassword} />

        </Stack.Navigator>
    )
}
const { width } = Dimensions.get('screen');

const Drawer = createDrawerNavigator();
export const DrawerNAv = () => {

    return (
        <Drawer.Navigator drawerStyle={{
            backgroundColor: Colors.sky,
            width
        }} initialRouteName="HomePage" drawerContent={(props) => <CustomDrawerMenue {...props} />}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Lang" component={Lang} />
            <Stack.Screen name="MyProfile" component={myProfil} />
            <Stack.Screen name="EditProfile" component={EditProfile} />



        </Drawer.Navigator>

    )
}