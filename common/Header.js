import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground, I18nManager } from 'react-native'

import Colors from '../consts/Colors';



const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

function Header({ label, navigation, }) {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ right: 20, bottom: 15 }}>
                    <ImageBackground source={require('../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                                    :
                                    <Image source={require('../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                            }
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                    <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                        <Image source={require('../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                        <Image source={require('../assets/Images/yass.jpg')} style={{ height: 45, width: 45, borderRadius: 50, }} />
                    </View>
                </TouchableOpacity>

            </View>
            <Text style={{ marginHorizontal: 25, fontFamily: 'flatMedium', fontSize: 18, }}>{label}</Text>
        </>
    )
}


export default Header
