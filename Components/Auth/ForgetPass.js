import React, { useState } from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import i18n from '../../locale/i18n'

function ForgetPass({ navigation }) {
    const [code, setCode] = useState('00000')

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
                inputStyle={{ borderColor: Colors.sky }}
                value={code}
                onChangeText={(e) => setCode(e)}
                LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 15 }}
            />
            <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('NewPass')} />

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
export default ForgetPass
