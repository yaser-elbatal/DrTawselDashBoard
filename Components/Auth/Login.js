import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, I18nManager, AsyncStorage } from 'react-native'

import { SText } from '../../common/SText';
import BackBtn from '../../common/BackBtn'
import { width } from '../../consts/HeightWidth'
import { InputIcon } from '../../common/InputText';
import Colors from '../../consts/Colors';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';

import {
    validatePhone,
    validatePassword,
} from "../../common/Validation";
import i18n from '../../locale/i18n'
import { useSelector, useDispatch } from 'react-redux';
import { SignIn } from '../../store/action/AuthAction';

import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo'
import Container from '../../common/Container';

function Login({ navigation }) {

    const lang = useSelector(state => state.lang.language);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, Setisloading] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [userId, setUserId] = useState(null);

    const [spinner, setSpinner] = useState(true);



    const getDeviceId = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        setDeviceId(deviceId);
        setUserId(null);

        AsyncStorage.setItem('deviceID', deviceId);
    };




    const _validate = () => {
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        return phoneErr || passwordErr;
    };

    const SubmitLoginHandler = () => {
        const isVal = _validate();

        if (!isVal) {
            setSpinner(true)

            dispatch(SignIn(phone, password, deviceId, lang, navigation)).then(() => setSpinner(false))
        }
        else {
            Toaster(_validate());
            setSpinner(false)

        }

    }
    useEffect(() => {
        setSpinner(false)
        getDeviceId().then(() => setSpinner(false))

    }, []);
    return (
        <Container loading={spinner}>

            <View style={styles.container}>

                <BackBtn navigation={navigation} />
                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
                        <Text style={styles.TextLogin}>{i18n.t('login')}</Text>
                        <Text style={styles.UText}>{i18n.t('loginInf')}</Text>
                    </View>

                    <Image source={require('../../assets/Images/Login.png')} style={styles.IMG} resizeMode='contain' />
                    <InputIcon
                        label={i18n.t('phone')}
                        placeholder={i18n.t('phone')}
                        onChangeText={(e) => setPhone(e)}
                        value={phone}
                        keyboardType='numeric' />

                    <InputIcon
                        label={i18n.t('password')}
                        placeholder={i18n.t('password')}
                        onChangeText={(e) => setPassword(e)}
                        value={password}
                        secureTextEntry
                        keyboardType='numeric'
                        styleCont={{ marginTop: 0 }}
                    />

                    <SText title={i18n.t('forgetPassword')} onPress={() => navigation.navigate('PhoneCheck')} style={styles.FPass} />


                    <BTN title={i18n.t('entry')} onPress={SubmitLoginHandler} ContainerStyle={styles.LoginBtn} />

                    <SText title={i18n.t('createAcc')} onPress={() => navigation.navigate('Fregister')} style={{ color: Colors.sky, fontSize: 15, marginVertical: 10 }} />

                </ScrollView>
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        color: Colors.fontBold
    },
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal

    },
    IMG: {
        width: width * .6,
        height: width * .7,
        alignSelf: 'center'
    },

    FPass: {
        alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
        marginHorizontal: 15,
        fontSize: 14
    },
    LoginBtn: {
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%'
    }

})
export default Login
