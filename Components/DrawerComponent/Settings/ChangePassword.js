import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'
import Colors from '../../../consts/Colors'
import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import { validatePassword, validateTwoPasswords } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'
import BTN from '../../../common/BTN'


function ChangePassword({ navigation }) {


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
            navigation.navigate('MyProfile')

        }
        else {
            Toaster(_validate());
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Image source={require('../../../assets/Images/imagethree.png')} style={styles.ImgBackGround} />

            <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.ScrolContainer}>
                <Text style={styles.MainText}>{i18n.t('cnagePass')}</Text>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, marginTop: 0 }}>
                        <InputIcon
                            placeholder={i18n.t('password')}
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                        />
                        <InputIcon
                            placeholder={i18n.t('confirmnewPass')}
                            value={nPassword}
                            onChangeText={(e) => setnPassword(e)}
                            styleCont={{ marginTop: 0 }}
                        />
                        <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('MyProfile')} />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: '100%',
        bottom: 90
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    LoginBtn: {
        borderRadius: 5,
        marginHorizontal: '5%',
        width: '90%',
        marginTop: 0
    }
})
export default ChangePassword
