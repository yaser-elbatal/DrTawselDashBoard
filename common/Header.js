import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native'

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
                            <Image source={require('../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                    <Image source={require('../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                    <Image source={require('../assets/Images/yass.jpg')} style={{ height: 45, width: 45, borderRadius: 50, }} />
                </View>
            </View>
            <Text style={{ marginHorizontal: 10, fontFamily: 'flatMedium', fontSize: 20 }}>{label}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    BigImg: {
        height: height * .15,
        width: width * .22,
        right: 10,
        bottom: 10
    },
    MenueImg: {
        width: 20,
        height: 20,



    },
    wrap: {
        position: 'absolute',
        marginHorizontal: 30,
        bottom: width * .06,
        left: -5
    },
    Text: {
        fontFamily: 'flatMedium',
        color: Colors.IconBlack,
        fontSize: width * .04,
        textAlign: 'center',
        top: width * .13,
        flexWrap: 'wrap'
    },
})
export default Header
