import React, { useState, useEffect } from 'react'
import {
    View, StyleSheet, Text, Toast, ActivityIndicator, Alert
} from 'react-native'
import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import i18n from '../../locale/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { ActivationCode, ResendCode } from '../../store/action/AuthAction'
import {
    validateCode,
    validatePassword,
    ValdiateActivationCode,
} from "../../common/Validation";
import { Toaster } from '../../common/Toaster';
import Container from '../../common/Container'
import * as Animatable from 'react-native-animatable';




function AccountConfirm({ navigation, route }) {
    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const { token } = route.params;
    const MyactivateCode = 1122;
    const dispatch = useDispatch()











    const _validate = () => {
        let codeErr = ValdiateActivationCode(code)
        return codeErr
    }

    const ActivateCode = () => {

        const val = _validate();
        if (MyactivateCode == code && !val) {
            setSpinner(true)
            dispatch(ResendCode(token, navigation, lang)).then(() => setSpinner(false))
        }
        else {
            Toaster(_validate());
            setSpinner(false)
        }
    }

    return (
        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ marginHorizontal: 20, }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                    <Text animation='flipInX' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                    <Text animation='flipInX' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('enterCod')}</Text>
                </View>
            </View>
            <Container loading={spinner}>

                <InputIcon
                    label={i18n.t('code')}
                    placeholder={i18n.t('code')}
                    onChangeText={(e) => setCode(e)}
                    value={code}
                    keyboardType='numeric'


                />
                < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ActivateCode} />
            </Container>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.bg
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        alignSelf: 'flex-start'

    },
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'

    },
    wrapCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '8%',
        marginTop: '10%'
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default AccountConfirm
