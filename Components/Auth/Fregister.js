import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { validateUserName, ValdiateSelect, validatePhone, validateEmail } from '../../common/Validation';
import { useDispatch } from 'react-redux';
import { width } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';

function Fregister({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [selectedRadion, setSelectedRadio] = useState(null)

    const [data, setData] = useState([
        { id: 1, title: `${i18n.t("yes")}` },
        { id: 0, title: `${i18n.t("no")}` }
    ])
    const [spinner, setSpinner] = useState(false);

    const dispatch = useDispatch();


    const [phoneStatus, setPhoneStatus] = useState(0);
    const [nameStatus, setNameStatus] = useState(0)
    const [emailStatues, setemailStatues] = useState(0)

    function activeInput(type) {
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
        if (type === 'name' || name !== '') setNameStatus(1);
        if (type === 'email' || email !== '') setemailStatues(1);

    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'name' && name == '') setNameStatus(1);
        if (type === 'email' && email !== '') setemailStatues(0);

    }

    const _validate = () => {


        let nameA = validateUserName(name)
        let phoneErr = validatePhone(phone);
        let emailErr = validateEmail(email)
        let SelectChoice = selectedRadion === null ? i18n.t('SelectYN') : SelectChoice
        return nameA || phoneErr || emailErr || SelectChoice
    };



    const NavigateToNext = () => {
        let Val = _validate();
        if (!Val) {
            navigation.navigate('SRegister')
        }
        else {
            setSpinner(false);
            Toaster(_validate());

        }
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
            <BackBtn navigation={navigation} />
            <View style={{ flexDirection: 'column', paddingStart: '5%' }}>
                <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                <Text style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('CompInfo')}</Text>
            </View>

            <InputIcon
                label={nameStatus === 1 ? i18n.t('name') : null}
                placeholder={nameStatus === 1 ? null : i18n.t('name')}
                onBlur={() => unActiveInput('name')}
                onFocus={() => activeInput('name')}
                inputStyle={{ borderColor: nameStatus === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setName(e)}
                value={name}
                LabelStyle={{ paddingHorizontal: nameStatus === 1 ? 10 : 0, color: nameStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
            />

            <InputIcon
                label={phoneStatus === 1 ? i18n.t('phone') : null}
                placeholder={phoneStatus === 1 ? null : i18n.t('phone')}
                onChangeText={(e) => setPhone(e)}
                value={phone}
                onBlur={() => unActiveInput('phone')}
                onFocus={() => activeInput('phone')}
                inputStyle={{ borderColor: phoneStatus === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: phoneStatus === 1 ? 10 : 0, color: phoneStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

                keyboardType='numeric'
                styleCont={{ marginTop: 0 }}
            />

            <InputIcon
                label={emailStatues === 1 ? i18n.t('email') : null}
                placeholder={emailStatues === 1 ? null : i18n.t('email')}
                onChangeText={(e) => setemail(e)}
                value={email}
                inputStyle={{ borderColor: emailStatues === 1 ? Colors.sky : Colors.InputColor }}
                LabelStyle={{ paddingHorizontal: emailStatues === 1 ? 10 : 0, color: emailStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                onBlur={() => unActiveInput('email')}
                onFocus={() => activeInput('email')}
                keyboardType='email-address'
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
