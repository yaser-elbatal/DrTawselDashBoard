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


    function activeInput(type) {
        if (type === 'Phone' || Phone !== '') setPhoneStatues(1);
    }

    function unActiveInput(type) {
        if (type === 'Phone' && Phone === '') setPhoneStatues(0);
    }

    const _validate = () => {
        let PhoenErr = validatePhone(Phone);

        return PhoenErr
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

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
                label={PhoneStatues === 1 ? i18n.t('phone') : null}
                placeholder={PhoneStatues === 1 ? null : i18n.t('phone')}
                keyboardType='numeric'

                onChangeText={(e) => setPhone(e)}
                value={Phone}
                onBlur={() => unActiveInput('Phone')}
                onFocus={() => activeInput('Phone')}
                inputStyle={{ borderColor: PhoneStatues === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: PhoneStatues === 1 ? 10 : 0, color: PhoneStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
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
