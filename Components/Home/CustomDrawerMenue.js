import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import UserContext from '../../routes/UserContext';



function CustomDrawerMenue({ navigation }) {
    const [Clicle, setClick] = useState(0)
    const { setLogout } = useContext(UserContext);


    return (
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }} >

                <TouchableOpacity>
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
            <Text style={[styles.hellText, { marginVertical: 0, bottom: 80, paddingHorizontal: 20 }]}>{i18n.t('Hello')}</Text>
            <ScrollView style={{ flex: 1, bottom: 50 }}>
                <View style={{ flexDirection: 'column', }}>

                    <TouchableOpacity onPress={() => setClick(0)} >
                        <View style={{ backgroundColor: Clicle === 0 ? '#09B9D8' : Colors.sky, marginTop: 10, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('HomePage')}</Text>
                        </View>
                    </TouchableOpacity >

                    <TouchableOpacity onPress={() => setClick(1)} >
                        <View style={{ backgroundColor: Clicle === 1 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText} >{i18n.t('menue')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(2)}>
                        <View style={{ backgroundColor: Clicle === 2 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('Prod')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(3)}>
                        <View style={{ backgroundColor: Clicle === 3 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('orders')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(4)}>
                        <View style={{ backgroundColor: Clicle === 4 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('specialOrder')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(5)}>
                        <View style={{ backgroundColor: Clicle === 5 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('AddOffer')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Settings'); setClick(6) }}>
                        <View style={{ backgroundColor: Clicle === 6 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('settings')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(7)}>
                        <View style={{ backgroundColor: Clicle === 7 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('Commentandratings')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(8)}>
                        <View style={{ backgroundColor: Clicle === 8 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('notifications')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(9)}>
                        <View style={{ backgroundColor: Clicle === 9 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('wallet')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(10)}>
                        <View style={{ backgroundColor: Clicle === 10 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('contactus')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(11)}>
                        <View style={{ backgroundColor: Clicle === 11 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('ManageAcc')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setClick(12)}>
                        <View style={{ backgroundColor: Clicle === 12 ? '#09B9D8' : Colors.sky, marginTop: 40, width: '95%' }}>
                            <Text style={styles.hellText}>{i18n.t('reports')}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setClick(13), setLogout() }}>
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
        paddingHorizontal: 80,
        fontFamily: 'flatMedium',
        fontSize: 18,
        color: Colors.bg,
        padding: 5

    }
})

export default CustomDrawerMenue
