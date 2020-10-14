import React, { useState, useEffect } from 'react'
import {
    View, StyleSheet, Text, Toast, ActivityIndicator
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
} from "../../common/Validation";
import { Toaster } from '../../common/Toaster';
import Container from '../../common/Container'




function AccountConfirm({ navigation, route }) {
    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const { token } = route.params;
    const MyactivateCode = 1122;
    const dispatch = useDispatch()






    const _validate = () => {
        let codeErr = validateCode(code);

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
        <Container loading={spinner}>
            <View style={styles.container}>

                <BackBtn navigation={navigation} />
                <View style={{ marginHorizontal: 20, }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                        <Text style={styles.UText}>{i18n.t('enterCod')}</Text>
                    </View>
                </View>

                <InputIcon
                    label={i18n.t('code')}
                    placeholder={i18n.t('code')}
                    onChangeText={(e) => setCode(e)}
                    value={code}
                    keyboardType='numeric'


                />
                < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ActivateCode} />
            </View>
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.bg
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
    },
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
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
