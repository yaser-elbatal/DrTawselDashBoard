import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import Colors from '../../consts/Colors'
import BackBtn from '../../common/BackBtn'
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { width, height } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from '../../common/Toaster';
import { SignUp } from '../../store/action/AuthAction';
import Container from '../../common/Container';

function TRegister({ navigation, route }) {

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();

    const [spinner, setSpinner] = useState(true);

    const [WebUrl, setWebUrl] = useState('');
    const [selecCommerical, setselecCommerical] = useState(null);
    const [SelectDelivery, setSelectDelivery] = useState(null)
    const { name, phone, email, password, isowner, department, nameAR, nameEN, city, BranchNum, CommercialRegister, MyLocation, latitude, longitude } = route.params


    const [data, setData] = useState([
        { id: 0, title: `${i18n.t("no")}` }
        ,
        { id: 1, title: `${i18n.t("yes")}` },
    ])

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, []);


    const _validate = () => {

        let UrlErr = WebUrl === '' ? i18n.t('webUrl') : null
        let SelectDeliveryErr = SelectDelivery === null ? i18n.t('SelectYN') : null;
        let selecCommericalErr = selecCommerical === null ? i18n.t('SelectYN') : null;

        return UrlErr || SelectDeliveryErr || selecCommericalErr

    }


    const ConfirmSignUp = () => {
        let val = _validate();
        if (!val) {
            setSpinner(true)
            const data = { name, nameAR, nameEN, password, phone, email, CommercialRegister, city, department, isowner, BranchNum, MyLocation, latitude, longitude, WebUrl, selecCommerical, SelectDelivery, lang };
            dispatch(SignUp(data, navigation)).then(() => setSpinner(false)).catch(e => { setSpinner(false); console.warn(e); })

        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    return (
        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
                <BackBtn navigation={navigation} />
                <View style={{ flexDirection: 'column', paddingStart: '5%' }}>
                    <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                    <Text style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('connectInfo')}</Text>
                </View>

                <InputIcon
                    label={i18n.t('webUrl')}
                    placeholder={i18n.t('Url')}
                    dataDetectorTypes={'link'}
                    multiline={true}
                    onChangeText={(e) => setWebUrl(e)}
                    value={WebUrl}
                    styleCont={{ marginTop: 20 }}
                />

                <View style={{ height: width * .14, marginHorizontal: '5%', flex: 1, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ paddingEnd: 80, fontFamily: 'flatMedium', paddingStart: 10, flex: .9, fontSize: 10, }}>
                        <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('Franch')}</Text>
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
                                    <Text style={[styles.sText, { color: selecCommerical === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <View style={{ height: width * .14, marginHorizontal: '5%', marginTop: 20, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ paddingEnd: 80, flex: .9, fontFamily: 'flatMedium', paddingStart: 10 }}>
                        <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('DeliveryServ')}</Text>
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
                                    <Text style={[styles.sText, { color: SelectDelivery === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ConfirmSignUp} />
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    },
})
export default TRegister
