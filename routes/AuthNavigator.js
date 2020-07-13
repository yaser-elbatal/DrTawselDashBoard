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
import Menue from '../Components/DrawerComponent/Menue/Menue';
import Products from '../Components/DrawerComponent/Products/Products';
import Orders from '../Components/DrawerComponent/Orders/Order';
import SpecialOrders from '../Components/DrawerComponent/SpecialOrders/SpecialOrders';
import IncomingRequests from '../Components/DrawerComponent/Orders/IncomingRequests';
import ActiveRequests from '../Components/DrawerComponent/Orders/ActiveRequests';
import Completedrequests from '../Components/DrawerComponent/Orders/Completedrequests';
import Rejectedrequests from '../Components/DrawerComponent/Orders/Rejectedrequests';
import OrderDetailes from '../Components/DrawerComponent/Orders/OrderDetailes';
import IncomingOrderDetailes from '../Components/DrawerComponent/Orders/IncomingOrderDetailes';
import ActiveOrderDetailes from '../Components/DrawerComponent/Orders/ActiveOrderDetailes';
import CompletedOrderDetailes from '../Components/DrawerComponent/Orders/CompletedOrderDetailes';
import ProductDetailes from '../Components/DrawerComponent/Orders/ProductDetailes';
import RejectedOrderDetailes from '../Components/DrawerComponent/Orders/RejectedOrderDetailes';
import IncomingSpecialOrder from '../Components/DrawerComponent/SpecialOrders/IncomingSpecialOrder';
import IcomingSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/IcomingSpecialOrderDetailes';
import ActiveSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/ActiveSpecialOrderDetailes';
import RejectedSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/RejectedSpecialOrderDetailes';
import ProductSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/ProductSpecialOrderDetailes';
import CompletedSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/CompletedSpecialOrderDetailes';
import AddProduct from '../Components/DrawerComponent/Products/AddProduct';
import SuccessAddition from '../Components/DrawerComponent/Products/SuccessAddition';
import ProductDet from '../Components/DrawerComponent/Products/ProductDet';
import AddOnotherProduct from '../Components/DrawerComponent/Products/AddOnotherProduct';
import AddOffer from '../Components/DrawerComponent/Offers/AddOffer';
import AddPices from '../Components/DrawerComponent/Offers/AddPices';


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
            <Stack.Screen name="Menue" component={Menue} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="SpecialOrders" component={SpecialOrders} />
            <Stack.Screen name="IncomingRequests" component={IncomingRequests} />
            <Stack.Screen name="ActiveRequests" component={ActiveRequests} />
            <Stack.Screen name="Completedrequests" component={Completedrequests} />
            <Stack.Screen name="Rejectedrequests" component={Rejectedrequests} />
            <Stack.Screen name="OrderDetailes" component={OrderDetailes} />
            <Stack.Screen name="IncomingOrderDetailes" component={IncomingOrderDetailes} />
            <Stack.Screen name="ActiveOrderDetailes" component={ActiveOrderDetailes} />
            <Stack.Screen name="CompletedOrderDetailes" component={CompletedOrderDetailes} />
            <Stack.Screen name="ProductDetailes" component={ProductDetailes} />
            <Stack.Screen name="RejectedOrderDetailes" component={RejectedOrderDetailes} />
            <Stack.Screen name="IncomingSpecialOrder" component={IncomingSpecialOrder} />
            <Stack.Screen name="IcomingSpecialOrderDetailes" component={IcomingSpecialOrderDetailes} />
            <Stack.Screen name="ActiveSpecialOrderDetailes" component={ActiveSpecialOrderDetailes} />
            <Stack.Screen name="RejectedSpecialOrderDetailes" component={RejectedSpecialOrderDetailes} />
            <Stack.Screen name="ProductSpecialOrderDetailes" component={ProductSpecialOrderDetailes} />
            <Stack.Screen name="CompletedSpecialOrderDetailes" component={CompletedSpecialOrderDetailes} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="SuccessAddition" component={SuccessAddition} />
            <Stack.Screen name="ProductDet" component={ProductDet} />
            <Stack.Screen name="AddOnotherProduct" component={AddOnotherProduct} />
            <Stack.Screen name="AddOffer" component={AddOffer} />
            <Stack.Screen name="AddPices" component={AddPices} />


















        </Drawer.Navigator>

    )
}