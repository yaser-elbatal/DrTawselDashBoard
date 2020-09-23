import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { validateUserName, validatePhone, validateEmail, validatePassword, validateTwoPasswords } from '../../common/Validation';
import { useDispatch } from 'react-redux';
import { width } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';

function Fregister({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [selectedRadion, setSelectedRadio] = useState(null)

    const [data, setData] = useState([

        { id: 0, title: `${i18n.t("no")}` },
        { id: 1, title: `${i18n.t("yes")}` },

    ])







    const _validate = () => {


        let nameA = validateUserName(name)
        let phoneErr = validatePhone(phone);
        let emailErr = validateEmail(email)
        let passwordErr = validatePassword(password);
        let twoPass = validateTwoPasswords(password, confirmPassword)
        let SelectChoice = selectedRadion === null ? i18n.t('SelectYN') : SelectChoice;

        return nameA || phoneErr || emailErr || passwordErr || twoPass || SelectChoice
    };



    const NavigateToNext = () => {
        let Val = _validate();
        if (!Val) {
            navigation.navigate('SRegister', { name: name, phone: phone, email: email, isowner: selectedRadion, password: password })
        }
        else {
            Toaster(_validate());

        }
    }




    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
            <BackBtn navigation={navigation} />
            <View style={{ flexDirection: 'column', paddingStart: '5%' }}>
                <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                <Text style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('CompInfo')}</Text>
            </View>

            <InputIcon
                label={i18n.t('name')}
                placeholder={i18n.t('name')}
                onChangeText={(e) => setName(e)}
                value={name}
            />

            <InputIcon
                label={i18n.t('phone')}
                placeholder={i18n.t('phone')}
                onChangeText={(e) => setPhone(e)}
                value={phone}

                keyboardType='numeric'
                styleCont={{ marginTop: 0 }}
            />

            <InputIcon
                label={i18n.t('email')}
                placeholder={i18n.t('email')}
                onChangeText={(e) => setemail(e)}
                value={email}

                keyboardType='email-address'
                styleCont={{ marginTop: 0 }}
            />

            <InputIcon
                label={i18n.t('password')}
                placeholder={i18n.t('password')}
                onChangeText={(e) => setPassword(e)}
                value={password}
                secureTextEntry
                styleCont={{ marginTop: 0 }}
                keyboardType='numeric'



            />
            <InputIcon
                label={i18n.t('confirmPass')}
                placeholder={i18n.t('confirmPass')}
                onChangeText={(e) => setConfirmPassword(e)}
                value={confirmPassword}
                secureTextEntry
                keyboardType='numeric'

                styleCont={{ marginTop: 0 }}
            />

            <View style={{ height: width * .14, marginHorizontal: '5%', borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ paddingEnd: 80, fontFamily: 'flatMedium', paddingStart: 10 }}>
                    <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('owner')}</Text>
                </View>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => { setSelectedRadio(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                <View style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: selectedRadion === index ? Colors.sky : Colors.fontNormal,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',

                                }}>
                                    {
                                        selectedRadion === index ?
                                            <View style={{
                                                height: 6,
                                                width: 6,
                                                borderRadius: 6,
                                                backgroundColor: Colors.sky,
                                            }} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.sText, { color: selectedRadion === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                            </TouchableOpacity>



                        )
                    })
                }

            </View>
            <BTN title={i18n.t('continue')} ContainerStyle={styles.LoginBtn} onPress={NavigateToNext} />

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default Fregister
