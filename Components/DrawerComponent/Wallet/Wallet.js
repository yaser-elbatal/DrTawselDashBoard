import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, I18nManager, Modal } from 'react-native'

import i18n from '../../../locale/i18n'
import Header from '../../../common/Header'
import { width, height } from '../../../consts/HeightWidth'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'

function Wallet({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('wallet')} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../../assets/Images/undraw_wallet.png')} style={{ width: width * .5, height: width * .4 }} resizeMode='contain' />
                <View style={styles.SCard}>
                    <Text style={styles.Text}>{i18n.t('CurrBallanc')}</Text>
                    <Text style={styles.Text}>100 {i18n.t('Rial')}</Text>
                </View>
            </View>

            <View style={styles.wrap}>

                <TouchableOpacity onPress={() => navigation.navigate('Banktransfer')}>
                    <View style={styles.Container}>
                        <Text style={styles.text}>{i18n.t('rechargebalance')}</Text>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                        }
                    </View>
                </TouchableOpacity>

                <View style={styles.Line}></View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.Container}>
                        <Text style={styles.text}>{i18n.t('Refundmoney')}</Text>
                        {
                            I18nManager.isRTL ?
                                <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                        }

                    </View>
                </TouchableOpacity>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible} >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, color: Colors.IconBlack }}>{i18n.t('Refundmone')} </Text>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 12, marginVertical: 5, color: Colors.fontNormal }}>{i18n.t('RecoverWallet')} </Text>

                                    <BTN title={i18n.t('agree')} ContainerStyle={styles.LoginBtn} onPress={() => setModalVisible(false)} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    SCard: {
        borderRadius: 25,
        borderTopStartRadius: 0,

        marginTop: 10,
        height: 80,
        width: width * .3,
        backgroundColor: Colors.sky,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    wrap: {
        flexDirection: 'column',
        marginTop: 25,
        backgroundColor: '#E3E3E3',
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
    },
    Img: {
        height: 25,
        width: 25,
    },
    BImg: {
        height: 50,
        width: 50,
    },
    Line: {
        width,
        height: 1,
        backgroundColor: Colors.fontBold,
        opacity: .2
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
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
        height: height * .25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center'
    },
    LoginBtn: {
        marginTop: 20,
        borderRadius: 5,
        marginHorizontal: 15,
        width: '91%',
    },
})
export default Wallet
