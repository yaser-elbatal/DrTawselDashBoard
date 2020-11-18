import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native'
import Colors from '../../consts/Colors'
import BackBtn from '../../common/BackBtn'
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { width, height } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from '../../common/Toaster';
import { SignUp } from '../../store/action/AuthAction';
import * as Animatable from 'react-native-animatable';

function TRegister({ navigation, route }) {

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();

    const [spinner, setSpinner] = useState(false);
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [WebUrl, setWebUrl] = useState('');
    const [selecCommerical, setselecCommerical] = useState(null);
    const [SelectDelivery, setSelectDelivery] = useState(null)
    const { name, phone, email, password, isowner, department, nameAR, nameEN, city, BranchNum, CommercialRegister, MyLocation, latitude, longitude } = route.params


    const [data, setData] = useState([
        { id: 0, title: `${i18n.t("no")}` }
        ,
        { id: 1, title: `${i18n.t("yes")}` },
    ])




    const _validate = () => {

        // let UrlErr = WebUrl === '' ? i18n.t('webUrl') : null
        let SelectDeliveryErr = SelectDelivery === null ? i18n.t('SelectYN') : null;
        let selecCommericalErr = selecCommerical === null ? i18n.t('SelectYN') : null;
        let ToEror = to == '' ? i18n.t('PrebaringTime') : null;
        let FromError = from == '' ? i18n.t('PrebaringTime') : null

        return selecCommericalErr || SelectDeliveryErr || ToEror || FromError

    }


    const ConfirmSignUp = () => {
        let val = _validate();
        if (!val) {
            setSpinner(true)
            const data = { name, nameAR, nameEN, password, phone, email, CommercialRegister, city, department, isowner, BranchNum, MyLocation, latitude, longitude, WebUrl, selecCommerical, SelectDelivery, to, from, lang };
            dispatch(SignUp(data, navigation)).then(() => setSpinner(false)).catch(e => { setSpinner(false); console.warn(e); })

        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
                <BackBtn navigation={navigation} />

                <View style={{ flexDirection: 'column', paddingStart: '5%', alignSelf: 'flex-start' }}>
                    <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                    <Text style={[styles.TextLogin, { marginVertical: 10, }]}>{i18n.t('connectInfo')}</Text>
                </View>

                <InputIcon
                    label={i18n.t('webUrl')}
                    placeholder={i18n.t('Url')}
                    dataDetectorTypes={'link'}
                    onChangeText={(e) => setWebUrl(e)}
                    value={WebUrl}

                    styleCont={{ marginTop: 20 }}
                />


                <Text style={{ fontFamily: 'flatMedium', color: Colors.IconBlack, marginHorizontal: '5%', alignSelf: 'flex-start' }}>{i18n.t('preparationTime')}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <InputIcon
                        label={i18n.t('from')}
                        placeholder={i18n.t('from')}
                        keyboardType='numeric'

                        onChangeText={(e) => setFrom(e)}
                        value={from}
                        styleCont={{ marginTop: 20, width: '30%' }}
                    />
                    <Text>:</Text>
                    <InputIcon
                        label={i18n.t('to')}
                        placeholder={i18n.t('to')}
                        keyboardType='numeric'

                        onChangeText={(e) => setTo(e)}
                        value={to}
                        styleCont={{ marginTop: 20, width: '30%', }}
                    />
                    <Text style={{ fontFamily: 'flatMedium' }}>{i18n.t('clock')}</Text>
                </View>


                <View style={{ height: width * .14, marginHorizontal: '5%', flex: 1, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ paddingEnd: 80, fontFamily: 'flatMedium', flex: .9, fontSize: 10, }}>
                        <Text style={{ color: Colors.inputTextMainColor, fontFamily: 'flatMedium', paddingStart: 10, alignSelf: 'flex-start' }}>{i18n.t('Franch')}</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setselecCommerical(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                    <View style={{
                                        height: 15,
                                        width: 15,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: selecCommerical === index ? Colors.sky : Colors.fontNormal,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',

                                    }}>
                                        {
                                            selecCommerical === index ?
                                                <View style={{
                                                    height: 6,
                                                    width: 6,
                                                    borderRadius: 6,
                                                    backgroundColor: Colors.sky,
                                                }} />
                                                : null
                                        }
                                    </View>
                                    <Text style={[styles.sText, { color: selecCommerical === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1, fontFamily: 'flatMedium' }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <View style={{ height: width * .14, marginHorizontal: '5%', marginTop: 20, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ paddingEnd: 80, flex: .9, fontFamily: 'flatMedium', paddingStart: 10 }}>
                        <Text style={{ color: Colors.inputTextMainColor, fontFamily: 'flatMedium', alignSelf: 'flex-start' }}>{i18n.t('DeliveryServ')}</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setSelectDelivery(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                    <View style={{
                                        height: 15,
                                        width: 15,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: SelectDelivery === index ? Colors.sky : Colors.fontNormal,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',

                                    }}>
                                        {
                                            SelectDelivery === index ?
                                                <View style={{
                                                    height: 6,
                                                    width: 6,
                                                    borderRadius: 6,
                                                    backgroundColor: Colors.sky,
                                                }} />
                                                : null
                                        }
                                    </View>
                                    <Text style={[styles.sText, { color: SelectDelivery === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1, fontFamily: 'flatMedium' }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ConfirmSignUp} />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'

    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        alignSelf: 'flex-start'

    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    },
})
export default TRegister
