import React from 'react'
import { View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { DrawerActions } from '@react-navigation/native';

function HomePage({ navigation }) {
    return (
        <View style={{ fex: 1, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ right: 20, bottom: 15 }}>
                    <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Image source={require('../../assets/Images/menu.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                    <Image source={require('../../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                    <Image source={require('../../assets/Images/yass.jpg')} style={{ height: 45, width: 45, borderRadius: 50, }} />
                </View>
            </View>
        </View>
    )
}

export default HomePage
