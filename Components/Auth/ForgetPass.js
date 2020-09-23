import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, } from 'react-native'
import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import i18n from '../../locale/i18n'
import { Toaster } from '../../common/Toaster';
import { validateCode } from '../../common/Validation'
import { useSelector, useDispatch } from 'react-redux'
import { ResendCode } from '../../store/action/AuthAction'

function ForgetPass({ navigation, route }) {
    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const { tokennn } = route.params;

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
            dispatch(ResendCode(tokennn, navigation))
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
                    <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ActivateCode} />
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
        marginTop: 0
    }
})
export default ForgetPass
