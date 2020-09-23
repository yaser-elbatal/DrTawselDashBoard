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
import {
    validatePhone,
} from "../../common/Validation";
import { Toaster } from '../../common/Toaster';
import { CheckPhone } from '../../store/action/AuthAction'

function PhoneCheck({ navigation }) {
    const [Phone, setPhone] = useState('');
    const [PhoneStatues, setPhoneStatues] = useState(0)
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();




    const _validate = () => {
        let PhoenErr = validatePhone(Phone);

        return PhoenErr
    }


    const ConFirmPhone = () => {
        let Val = _validate();
        if (!Val) {
            setSpinner(true)
            dispatch(CheckPhone(lang, Phone, navigation))

        }
        else {
            Toaster(_validate())
            setSpinner(false)
        }
    }
    return (
        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ margin: 20, bottom: 30 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('enterPhone')}</Text>
                </View>
            </View>

            <InputIcon
                label={i18n.t('phone')}
                placeholder={i18n.t('phone')}
                keyboardType='numeric'

                onChangeText={(e) => setPhone(e)}
                value={Phone}

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
                    < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ConFirmPhone} />

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

    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})

export default PhoneCheck
