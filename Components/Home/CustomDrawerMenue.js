import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../store/action/AuthAction'



function CustomDrawerMenue({ navigation }) {
    const [Clicle, setClick] = useState(0)

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const user = useSelector(state => state.auth.user);



    const logoutFunc = () => {
        dispatch(Logout())
    }

    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }} >



                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                    <View style={{ marginTop: 50, marginHorizontal: 20 }}>
                        <Image source={require('../../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                        <Image source={require('../../assets/Images/yass.jpg')} style={{ height: 45, width: 45, borderRadius: 50, }} />
                    </View>
                </TouchableOpacity>



                <View style={{ bottom: 50, marginEnd: -20 }}>
                    <ImageBackground source={require('../../assets/Images/bigP.png')} style={{ height: 180, width: 100, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                            <Image source={require('../../assets/Images/crossgray.png')} style={{ height: 20, width: 20, marginTop: 45, }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            <ScrollView style={{ flex: 1, bottom: 70, }} showsVerticalScrollIndicator={false}>
                <Text style={[styles.hellText, { paddingHorizontal: 20, alignSelf: 'flex-start' }]}>{i18n.t('Hello')}</Text>

                <View style={{ flexDirection: 'column', marginVertical: 20 }}>

                    <TouchableOpacity onPress={() => { setClick(0); navigation.navigate('HomePage') }} >
                        <View style={{ backgroundColor: Clicle === 0 ? '#09B9D8' : Colors.sky, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('HomePage')}</Text>
                        </View>
                    </TouchableOpacity >

                    <TouchableOpacity onPress={() => { setClick(1), navigation.navigate('Menue') }} >
                        <View style={{ backgroundColor: Clicle === 1 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText} >{i18n.t('menue')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setClick(2); navigation.navigate('Products') }} >
                        <View style={{ backgroundColor: Clicle === 2 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('Prod')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setClick(3); navigation.navigate('Orders') }} >
                        <View style={{ backgroundColor: Clicle === 3 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('orders')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setClick(4); navigation.navigate('SpecialOrders') }}>
                        <View style={{ backgroundColor: Clicle === 4 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('specialOrder')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setClick(5); navigation.navigate('AddOffer') }}>
                        <View style={{ backgroundColor: Clicle === 5 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('AddOffer')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Settings'); setClick(6) }}>
                        <View style={{ backgroundColor: Clicle === 6 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('settings')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Comments'); setClick(7) }}>
                        <View style={{ backgroundColor: Clicle === 7 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('Commentandratings')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Notifications'); setClick(8) }}>
                        <View style={{ backgroundColor: Clicle === 8 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.hellText}>{i18n.t('notifications')}</Text>
                            <View style={{ backgroundColor: Colors.bg, height: 30, width: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: Colors.sky, fontFamily: 'flatMedium', fontSize: 14 }}>2</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Wallet'); setClick(9) }}>
                        <View style={{ backgroundColor: Clicle === 9 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('wallet')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('ContactUs'); setClick(10) }}>
                        <View style={{ backgroundColor: Clicle === 10 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('contactus')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('ManageAccount'); setClick(11) }}>
                        <View style={{ backgroundColor: Clicle === 11 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('ManageAcc')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Report'); setClick(12) }}>
                        <View style={{ backgroundColor: Clicle === 12 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('reports')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={logoutFunc}>
                        <View style={{ backgroundColor: Clicle === 13 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('logout')}</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    hellText: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        color: Colors.bg,
        padding: 5,
        alignSelf: 'flex-start',
        paddingHorizontal: 60

    }
})

export default CustomDrawerMenue
