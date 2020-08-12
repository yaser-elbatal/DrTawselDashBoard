import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView,I18nManager} from 'react-native'
import BackBtn from '../../common/BackBtn'
import { InputIcon } from '../../common/InputText'
import Colors from '../../consts/Colors';
import { CheckBox } from 'native-base';
import { validateUserName, validatePhone, validatePassword, validateEmail, validateCode } from '../../common/Validation';
import { Picker } from 'native-base';
import BTN from '../../common/BTN';
import i18n from '../../locale/i18n';



function Register({ navigation }) {
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('')

    const [isSelected, setSelection] = useState();
    const [select, setSelect] = useState(false);
     const [city, setCity] = useState('')
    const [isSelected2, setSelection2] = useState(undefined);


    const _validate = () => {
        let nameErr = validateUserName(name)
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        let emailErr = validateEmail(email)
        let licenseErr = validateCode(License);

        return nameErr || phoneErr || passwordErr || emailErr || licenseErr || carnumErr
    };


    const onValueChange = (value) => {
        setSelection(value)
    }
    const onValueChange2 = (value) => {
        setSelection2(value)
    }
    return (

        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ margin: 20, bottom: 30 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1, bottom: 30 }}>
                <InputIcon
                    label={i18n.t('username')}
                    placeholder={i18n.t('username')}
                    inputStyle={{ borderColor: Colors.sky }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 14 }}
                />
                <InputIcon
                    placeholder={i18n.t('usernamen')}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    secureTextEntry
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('phone')}
                    onChangeText={(e) => setPhone(e)}
                    value={phone}
                    secureTextEntry
                    keyboardType='numeric'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('CommercialRegister')}

                    styleCont={{ marginTop: 0 }}
                />
                <View style={styles.DrbContain}>
                    <Picker
                        mode="dropdown"
                        style={{ width: '90%', color: Colors.fontNormal, marginHorizontal: 5 }}
                        headerTitleStyle={{color:Colors.InputColor,fontSize: 12, fontFamily: 'flatMedium'}}
                        placeholder={i18n.t('city')}
                        placeholderStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        placeholderIconColor={Colors.IconBlack}
                        itemStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        itemTextStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        textStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        selectedValue={isSelected}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="cairo" value="key0" />
                        <Picker.Item label="tanta" value="key1" />
                        <Picker.Item label="mansoura" value="key2" />
                        <Picker.Item label="mahalla" value="key3" />
                        <Picker.Item label="Dmam" value="key4" />
                    </Picker>
                </View>

                <View style={[styles.DrbContain, { marginTop: 15 }]}>
                    <Picker
                        mode="dropdown"
                        style={{ width: '90%', color: Colors.fontNormal, marginHorizontal: 5 }}
                        placeholder={i18n.t('deb')}
                        placeholderStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        placeholderIconColor={Colors.IconBlack}
                        itemStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        itemTextStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        textStyle={{color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        selectedValue={isSelected2}
                        onValueChange={onValueChange2}
                    >
                        <Picker.Item label="cairo" value="key0" />
                        <Picker.Item label="tanta" value="key1" />
                        <Picker.Item label="mansoura" value="key2" />
                        <Picker.Item label="mahalla" value="key3" />
                        <Picker.Item label="Dmam" value="key4" />
                    </Picker>
                </View>


                <InputIcon
                    placeholder={i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 15 }}
                />
                <InputIcon
                    placeholder={i18n.t('confirmPass')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry
                    keyboardType='numeric'
                    styleCont={{ marginTop: 0 }}
                />
               
                <View style={styles.wrapCheck}>
                    <CheckBox checked={select} color={select ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: select ? Colors.sky : '#DBDBDB', width: 18, height: 18, }} onPress={() => setSelect(!select)} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.Policy}>{i18n.t('agreeTo')}</Text>
                        <Text style={styles.Prill}>{i18n.t('term')}</Text>
                    </View>
                </View>
                <BTN title={i18n.t('register')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('AccConfrm')} />

            </ScrollView>
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
    Prill: {
        color: Colors.sky,
        marginHorizontal: 20,
        fontSize: 14,
        fontFamily: 'flatMedium'
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: "5%"
    },

    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
    },
    wrapCheck: {
        flexDirection: 'row',
        marginHorizontal: '3%',
    },
    Policy: {
        marginHorizontal: 20,
        fontSize: 12,
        fontFamily: 'flatMedium'

    }
    ,
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default Register
