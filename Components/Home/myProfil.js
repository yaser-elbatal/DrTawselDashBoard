import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'

function myProfil({ navigation }) {




    return (
        <View style={{ flex: 1 }}>

            <Image source={require('../../assets/Images/imagethree.png')} style={styles.ImgBackGround} />

            <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.ScrolContainer}>
                <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, marginTop: 0 }}>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{i18n.t('username')}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/Images/Icon_edit.png')} style={styles.EditImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Line}></View>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{i18n.t('usernamen')}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/Images/Icon_edit.png')} style={styles.EditImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Line}></View>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{i18n.t('city')}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/Images/Icon_edit.png')} style={styles.EditImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Line}></View>

                        <View style={styles.Wrab}>
                            <Text style={styles.user}>{'userInfo@Gmail.com'}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/Images/Icon_edit.png')} style={styles.EditImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Line}></View>

                        <View style={styles.Wrab}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.user}>{i18n.t('CommercialRegister')}</Text>
                                <Text style={[styles.user, { fontSize: 12, color: Colors.fontNormal }]}>97822222222222222</Text>

                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Image source={require('../../assets/Images/Icon_edit.png')} style={styles.EditImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Line}></View>

                    </View>


                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: '100%',
        bottom: 90
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
})
export default myProfil
