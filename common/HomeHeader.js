import React from 'react'
import Colors from '../consts/Colors'
import { View, TouchableOpacity, Image, ImageBackground, Text } from 'react-native'

function HomeHeader({ label, title, navigation, onPress }) {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ right: 20, bottom: 15 }}>
                    <ImageBackground source={require('../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Image source={require('../assets/Images/menu.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <View style={{ marginTop: 47, margin: 20 }}>
                        <Image source={require('../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                        <Image source={require('../assets/Images/yass.jpg')} style={{ height: 45, width: 45, borderRadius: 50, }} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'column', margin: 20, }}>
                <Text style={{ fontFamily: 'flatMedium', fontSize: 20 }}>{label}</Text>
                <Text style={{ fontFamily: 'flatMedium', fontSize: 12, color: Colors.fontNormal }}>{title}</Text>
            </View>
        </View>
    )
}

export default HomeHeader
