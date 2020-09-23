import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, I18nManager, Modal, Platform } from 'react-native'

import i18n from '../../../locale/i18n'
import Header from '../../../common/Header'
import { width, height } from '../../../consts/HeightWidth'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { useSelector, useDispatch } from 'react-redux'
import { GetWallet, Withdrawwallet } from '../../../store/action/CommentsAction'
import Container from '../../../common/Container'
import { InputIcon } from '../../../common/InputText'
import { validateAccountNum } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'

function Wallet({ navigation }) {


    const [accountnum, setAccountnum] = useState('');

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const TotalWallet = useSelector(state => state.Comments.wallet)
    const [spinner, setSpinner] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();


    const _validate = () => {

        let accountnumErr = validateAccountNum(accountnum)


        return accountnumErr
    };



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetWallet(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])

    const WithdrawwalletConfirm = () => {
        let val = _validate();
        if (!val) {
            setSpinner(true)
            dispatch(Withdrawwallet(token, accountnum)).then(() => setSpinner(false))
            setAccountnum('')
            setModalVisible(false)
        }
        else {
            setSpinner(false)
            Toaster(_validate());
        }
    }


    return (
        <Container loading={spinner}>

            <View style={{ flex: 1 }}>
                <Header navigation={navigation} label={i18n.t('wallet')} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../../assets/Images/undraw_wallet.png')} style={{ width: width * .5, height: width * .4 }} resizeMode='contain' />
                    <View style={styles.SCard}>
                        <Text style={styles.Text}>{i18n.t('CurrBallanc')}</Text>
                        {
                            TotalWallet === undefined ? null :
                                <Text style={styles.Text}>{TotalWallet.amount} {i18n.t('Rial')}</Text>

                        }
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

                            <View style={[styles.centeredView, { backgroundColor: Colors.bg }]}>
                                <View style={styles.modalView}>

                                    <View style={{ margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'flatMedium', fontSize: 12, marginVertical: 5, color: Colors.fontNormal }}>{i18n.t('RecoverWallet')} </Text>
                                        <InputIcon
                                            label={i18n.t("Accnum")}
                                            placeholder={i18n.t("Accnum")}
                                            value={accountnum}
                                            onChangeText={(e) => setAccountnum(e)}
                                            styleCont={{ marginTop: 10, width, }}
                                            inputStyle={{ borderRadius: 25, marginHorizontal: '3%' }}
                                            keyboardType='numeric'


                                        />
                                        <BTN title={i18n.t('agree')} ContainerStyle={styles.LoginBtn} onPress={WithdrawwalletConfirm} />
                                        <BTN title={i18n.t('close')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.inputTextMainColor }]} onPress={() => setModalVisible(false)} />

                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

            </View>
        </Container>
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
        opacity: Platform.OS = 'ios' ? .95 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
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
