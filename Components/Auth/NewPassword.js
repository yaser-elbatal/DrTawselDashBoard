import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, } from 'react-native'


import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import { validatePassword, validateTwoPasswords } from '../../common/Validation'
import i18n from '../../locale/i18n'
import { useDispatch } from 'react-redux'
import { ResetPassword } from '../../store/action/AuthAction'
import { Toaster } from '../../common/Toaster'


function NewPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const { token } = route.params;

    useEffect(() => {
        token

    }, []);

    const [passwordStatus, setPasswordStatus] = useState(0);
    const [enpasswordStatus, setenPasswordStatus] = useState(0);

    const dispatch = useDispatch();

    function activeInput(type) {
        if (type === 'password' || password !== '') setPasswordStatus(1);
        if (type === 'confirmPassword' || confirmPassword !== '') setenPasswordStatus(1);

    }

    function unActiveInput(type) {
        if (type === 'password' && password === '') setPasswordStatus(0);
        if (type === 'confirmPassword' || confirmPassword !== '') setenPasswordStatus(0);

    }

    const _validate = () => {

        let passwordErr = validatePassword(password);
        let passConfirmErr = validateTwoPasswords(password, confirmPassword)

        return passwordErr || passConfirmErr;
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);


    const SubmitLoginHandler = () => {
        const isVal = _validate();
        if (!isVal) {
            dispatch(ResetPassword(password, token, navigation))
            setSpinner(true)

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
                    <Text style={styles.TextLogin}>{i18n.t('forgetPss')}</Text>
                    <Text style={styles.UText}>{i18n.t('enternewPass')}</Text>
                </View>
            </View>

            <InputIcon
                label={passwordStatus === 1 ? i18n.t('password') : null}
                placeholder={passwordStatus === 1 ? null : i18n.t('password')}
                onChangeText={(e) => setPassword(e)}
                value={password}

                secureTextEntry
                styleCont={{ marginTop: 15 }}

                inputStyle={{ borderColor: passwordStatus === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: passwordStatus === 1 ? 10 : 0, color: passwordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                onBlur={() => unActiveInput('password')}
                onFocus={() => activeInput('password')}
                keyboardType='numeric'
            />
            <InputIcon
                label={enpasswordStatus === 1 ? i18n.t('confirmPass') : null}
                placeholder={enpasswordStatus === 1 ? null : i18n.t('confirmPass')}
                onChangeText={(e) => setConfirmPassword(e)}
                value={confirmPassword}
                secureTextEntry
                keyboardType='numeric'
                onBlur={() => unActiveInput('confirmPassword')}
                onFocus={() => activeInput('confirmPassword')}
                inputStyle={{ borderColor: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: enpasswordStatus === 1 ? 10 : 0, color: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                styleCont={{ marginTop: 0 }}
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
                    <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={SubmitLoginHandler} />
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
export default NewPassword
