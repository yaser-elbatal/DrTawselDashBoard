import React, { useState } from 'react'
import { View, StyleSheet, Text, } from 'react-native'


import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import { validatePassword, validateTwoPasswords } from '../../common/Validation'
import i18n from '../../locale/i18n'


function NewPassword({ navigation }) {
    const [password, setPassword] = useState('');
    const [nPassword, setnPassword] = useState('')

    const _validate = () => {

        let passwordErr = validatePassword(password);
        let passConfirmErr = validateTwoPasswords(password, nPassword)

        return codeErr || passwordErr || passConfirmErr;
    };

    const SubmitLoginHandler = () => {
        const isVal = _validate();
        if (!isVal) {
            navigation.navigate('Login')

        }
        else {
            Toaster(_validate());
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
                placeholder={i18n.t('password')}
                inputStyle={{}}
                value={password}
                onChangeText={(e) => setPassword(e)}
            />
            <InputIcon
                placeholder={i18n.t('confirmnewPass')}
                inputStyle={{}}
                value={nPassword}
                onChangeText={(e) => setnPassword(e)}
                styleCont={{ marginTop: 0 }}
            />
            <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('Login')} />

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
