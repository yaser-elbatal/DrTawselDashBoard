import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions, } from 'react-native'

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

function CompletedSpecialOrderDetailes({ navigation }) {

    const [click, setClick] = useState(false)
    const [click1, setClick1] = useState(false)
    const [click3, setClick3] = useState(false)
    const [click4, setClick4] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('orderDetailes') + '#1000'} />
            <ScrollView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => setClick(!click)}>
                    <View style={{ width: '95%', margin: 10, backgroundColor: Colors.InputColor, height: 40, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('ClientInfo')}</Text>
                            {
                                click ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click ?
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                <Text style={styles.name}>{i18n.t('rebresentativename')} :</Text>
                                <Text style={styles.nMenu}>اوامر الشبكه</Text>
                                <TouchableOpacity onPress={() => { }}>
                                    <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                                <Text style={styles.name}>{i18n.t('phone')}    :      </Text>
                                <Text style={styles.nMenu}>1234567891           </Text>
                            </View>
                        </View>
                        : null
                }

                <TouchableOpacity onPress={() => setClick1(!click1)}>
                    <View style={styles.Container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                            {
                                click1 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click1 ?
                        <View style={{ margin: 20, marginTop: 0 }}>
                            <Text style={{ textAlign: 'center' }}>
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                                هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه

                        </Text>
                        </View>


                        : null
                }
                <TouchableOpacity onPress={() => setClick3(!click3)}>
                    <View style={styles.Container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('Paymentmethod')}</Text>
                            {
                                click3 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>

                {
                    click3 ?
                        <Text style={[styles.name, { marginHorizontal: 40, marginVertical: 10, marginTop: 0 }]}>{i18n.t('cash')}</Text>
                        :
                        null

                }

                <TouchableOpacity onPress={() => setClick4(!click4)}>
                    <View style={styles.Container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.nMenu}>{i18n.t('prices')}</Text>
                            {
                                click4 ?

                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                    :
                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    click4 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 150, marginHorizontal: 40, marginVertical: 20, marginTop: 0 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.name}>{i18n.t('productPrice')}</Text>
                                <Text style={[styles.name, { marginVertical: 5 }]}>{i18n.t('Deliveryprice')}</Text>
                                <Text style={styles.name}>{i18n.t('total')}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text>:</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.sname}>180 {i18n.t('Rial')}</Text>
                                <Text style={[styles.sname, { marginVertical: 5 }]}>20{i18n.t('Rial')}</Text>
                                <Text style={[styles.sname, { color: Colors.RedColor }]}> {i18n.t('Rial')} 200 </Text>
                            </View>
                        </View>
                        : null
                }
                < BTN title={i18n.t('requestsuccessfully')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('HomePage')} />

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.IconBlack
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
        width: '95%',
        marginTop: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Container: {
        width: '95%', margin: 10,
        backgroundColor: Colors.InputColor,
        height: 40, marginTop: 0
    },

})
export default CompletedSpecialOrderDetailes
