import React, { useState, useContext, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../store/action/AuthAction'
import { NotificationCount } from '../../store/action/HomeAction'
import * as Animatable from 'react-native-animatable';



function CustomDrawerMenue({ navigation }) {
    const [Clicle, setClick] = useState(0)

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.user.data.token);
    const user = useSelector(state => state.auth.user.data);
    const lang = useSelector(state => state.lang.language);
    const NotifyCount = useSelector(state => state.home.NotifyCount ? state.home.NotifyCount.data ? state.home.NotifyCount.data.count : null : null);

    useEffect(() => {
        dispatch(NotificationCount(token, lang))
    }, [])
    console.log(NotifyCount);



    const logoutFunc = () => {
        dispatch(Logout(token))
    }
    // console.log(token);
    return (
        <View style={{ flex: 1, }}>

            <Animatable.View animation="pulse" easing="ease-out" delay={500} style={{ justifyContent: 'space-between', flexDirection: 'row', flex: .22, overflow: 'hidden' }} >



                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={{ top: 55, paddingStart: 10 }}>
                    <Image source={require('../../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                    <Image source={{ uri: user.avatar }} style={{ height: 45, width: 45, borderRadius: 50, }} />
                </TouchableOpacity>



                <ImageBackground source={require('../../assets/Images/bigP.png')} style={{ height: 180, width: 100, alignItems: 'center', justifyContent: 'center', bottom: 35, left: 12 }} resizeMode='contain'>
                    <TouchableOpacity onPress={() => navigation.closeDrawer()} style={{ top: 15 }}>
                        <Image source={require('../../assets/Images/crossgray.png')} style={{ height: 20, width: 20, }} resizeMode='contain' />
                    </TouchableOpacity>
                </ImageBackground>

            </Animatable.View>

            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <Animatable.Text animation="flash" easing="ease-out" delay={500} style={[styles.hellText, { paddingHorizontal: 20, alignSelf: 'flex-start' }]}>{i18n.t('Hello')} {user.name}</Animatable.Text>

                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={{ flexDirection: 'column', marginTop: 15 }}>

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

                    {/* <TouchableOpacity onPress={() => { setClick(4); navigation.navigate('SpecialOrders') }}>
                        <View style={{ backgroundColor: Clicle === 4 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('specialOrder')}</Text>
                        </View>
                    </TouchableOpacity> */}

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
                                <Text style={{ color: Colors.sky, fontFamily: 'flatMedium', fontSize: 14 }}>{NotifyCount}</Text>
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

                    <TouchableOpacity onPress={logoutFunc} style={{ marginBottom: 20 }}>
                        <View style={{ backgroundColor: Clicle === 13 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('logout')}</Text>
                        </View>
                    </TouchableOpacity>


                </Animatable.View>
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
