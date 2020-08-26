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
import { ActivationCode } from '../../store/action/AuthAction'
import {
    validateCode,
} from "../../common/Validation";
import { Toaster } from '../../common/Toaster';


function ActivateCode({ navigation, route }) {
    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const { token } = route.params;
    console.log('tokenFRomActivtion' + token);
    const MyactivateCode = 1122;
    const dispatch = useDispatch()

    function activeInput(type) {
        if (type === 'code' || code !== '') setCodeStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'code' && code === '') setCodeStatus(0);
    }
    useEffect(() => {
        token
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

    const _validate = () => {
        let codeErr = validateCode(code);

        return codeErr
    }

    const ActivateCode = () => {

        const val = _validate();
        if (MyactivateCode == code && !val) {
            setSpinner(true)
            dispatch(ActivationCode(code, token, lang))
        }
        else {
            Toaster(_validate());
            setSpinner(false)
        }
    }

    return (
        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ margin: 20, bottom: 30 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('enterCod')}</Text>
                </View>
            </View>

            <InputIcon
                label={codeStatus === 1 ? i18n.t('code') : null}
                placeholder={codeStatus === 1 ? null : i18n.t('code')}
                onChangeText={(e) => setCode(e)}
                value={code}
                keyboardType='numeric'

                onBlur={() => unActiveInput('code')}
                onFocus={() => activeInput('code')}
                inputStyle={{ borderColor: codeStatus === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: codeStatus === 1 ? 10 : 0, color: codeStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />
            {
                spinner ?
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 99999,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}>
                        <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center' }} />
                    </View>
                    :
                    < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ActivateCode} />

            }

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

export default ActivateCode
