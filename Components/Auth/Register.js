import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, I18nManager } from 'react-native'
import BackBtn from '../../common/BackBtn'
import { InputIcon } from '../../common/InputText'
import Colors from '../../consts/Colors';
import { CheckBox } from 'native-base';
import { validateUserName, validatePhone, validatePassword, validateEmail, validateCode, validateTwoPasswords, ValditeCommercialRegister } from '../../common/Validation';
import { Picker } from 'native-base';
import BTN from '../../common/BTN';
import i18n from '../../locale/i18n';
import { Toaster } from '../../common/Toaster';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../../store/action/AuthAction';



function Register({ navigation }) {
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [CommercialRegister, setCommercialRegister] = useState('');



    const [isSelected, setSelection] = useState("key1");
    const [select, setSelect] = useState(false);
    const [city, setCity] = useState('')
    const [department, setDepartment] = useState('')

    const [isSelected2, setSelection2] = useState("key1");

    const [phoneStatus, setPhoneStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [nameARStatus, setnameARStatus] = useState(0);
    const [nameENStatus, setNameENStatus] = useState(0)
    const [enpasswordStatus, setenPasswordStatus] = useState(0);
    const [emailStatues, setemailStatues] = useState(0)
    const [CommercialRegisterStatues, setCommercialRegisterstatues] = useState(0)


    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch()


    function activeInput(type) {
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
        if (type === 'password' || password !== '') setPasswordStatus(1);
        if (type === 'nameAR' || nameAR !== '') setnameARStatus(1);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'email' || email !== '') setemailStatues(1);
        if (type === 'confirmPassword' || confirmPassword !== '') setenPasswordStatus(1);
        if (type === 'CommercialRegister' || CommercialRegister !== '') setCommercialRegisterstatues(1);

    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'password' && password === '') setPasswordStatus(0);
        if (type === 'nameAR' || nameAR !== '') setnameARStatus(0);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(0);
        if (type === 'email' || email !== '') setemailStatues(0);
        if (type === 'confirmPassword' || confirmPassword !== '') setenPasswordStatus(0);
        if (type === 'CommercialRegister' || CommercialRegister !== '') setCommercialRegisterstatues(0);

    }


    const _validate = () => {
        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        let emailErr = validateEmail(email)
        let ValditeCommercialRegisterErr = ValditeCommercialRegister(CommercialRegister)
        let twoPass = validateTwoPasswords(password, confirmPassword)
        return nameErr || nameEnErr || phoneErr || passwordErr || emailErr || ValditeCommercialRegisterErr || twoPass
    };


    const onValueChange = (value) => {
        setSelection(value)
    }
    const onValueChange2 = (value) => {
        setSelection2(value)
    }

    const SubmitRegister = () => {
        const val = _validate();
        if (!val) {
            const data = { nameAR, nameEN, password, phone, email, CommercialRegister, city, department, lang };
            dispatch(SignUp(data, navigation))

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
                    <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1, bottom: 30 }} showsVerticalScrollIndicator={false} >
                <InputIcon
                    label={nameARStatus === 1 ? i18n.t('username') : null}
                    placeholder={nameARStatus === 1 ? null : i18n.t('username')}
                    onBlur={() => unActiveInput('nameAR')}
                    onFocus={() => activeInput('nameAR')}
                    inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: nameARStatus === 1 ? 10 : 0, color: nameARStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />
                <InputIcon
                    label={nameENStatus === 1 ? i18n.t('usernamen') : null}
                    placeholder={nameENStatus === 1 ? null : i18n.t('usernamen')}
                    onBlur={() => unActiveInput('nameEN')}
                    onFocus={() => activeInput('nameEN')}
                    inputStyle={{ borderColor: nameENStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                    LabelStyle={{ paddingHorizontal: nameENStatus === 1 ? 10 : 0, color: nameENStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

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
                <InputIcon
                    label={CommercialRegisterStatues === 1 ? i18n.t('CommercialRegister') : null}
                    placeholder={CommercialRegisterStatues === 1 ? null : i18n.t('CommercialRegister')}
                    value={CommercialRegister}
                    onChangeText={(e) => setCommercialRegister(e)}
                    inputStyle={{ borderColor: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: CommercialRegisterStatues === 1 ? 10 : 0, color: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('CommercialRegister')}
                    onFocus={() => activeInput('CommercialRegister')}
                    keyboardType='numeric'

                    styleCont={{ marginTop: 0 }}
                />
                <View style={styles.DrbContain}>
                    <Picker
                        mode="dropdown"
                        style={{ width: '90%', color: Colors.fontNormal, marginHorizontal: 5 }}
                        headerTitleStyle={{ color: Colors.InputColor, fontSize: 18, fontFamily: 'flatMedium', alignSelf: 'flex-end' }}
                        placeholder={i18n.t('city')}
                        placeholderStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        placeholderIconColor={Colors.IconBlack}
                        itemStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium', alignSelf: 'flex-end' }}
                        itemTextStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium', alignSelf: 'flex-end' }}
                        textStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium', alignSelf: 'flex-end' }}
                        selectedValue={isSelected}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="egypt" value="key0" />
                        <Picker.Item label="tanta" value="key1" />
                        <Picker.Item label="mansoura" value="key2" />
                        <Picker.Item label="mahalla" value="key3" />
                        <Picker.Item label="رياض" value="key4" />
                    </Picker>
                </View>

                <View style={[styles.DrbContain, { marginTop: 15 }]}>
                    <Picker
                        mode="dropdown"
                        style={{ width: '90%', color: Colors.fontNormal, marginHorizontal: 5 }}
                        placeholder={i18n.t('deb')}
                        placeholderStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        placeholderIconColor={Colors.IconBlack}
                        itemStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        itemTextStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        textStyle={{ color: Colors.InputColor, fontFamily: 'flatMedium' }}
                        selectedValue={isSelected2}
                        onValueChange={onValueChange2}
                    >
                        <Picker.Item label="cairo" value="key0" />
                        <Picker.Item label="tanta" value="key1" />
                        <Picker.Item label="منصوره" value="key2" />
                        <Picker.Item label="mahalla" value="key3" />
                        <Picker.Item label="Dmam" value="key4" />
                    </Picker>
                </View>


                <InputIcon
                    label={passwordStatus === 1 ? i18n.t('password') : null}
                    placeholder={passwordStatus === 1 ? null : i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    keyboardType='numeric'
                    secureTextEntry
                    styleCont={{ marginTop: 15 }}

                    inputStyle={{ borderColor: passwordStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: passwordStatus === 1 ? 10 : 0, color: passwordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('password')}
                    onFocus={() => activeInput('password')}
                    keyboardType='numeric'



                />
                <InputIcon
                    label={enpasswordStatus === 1 ? i18n.t('confirmPass') : null}
                    placeholder={enpasswordStatus === 1 ? null : i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry
                    keyboardType='numeric'
                    onBlur={() => unActiveInput('confirmPassword')}
                    onFocus={() => activeInput('confirmPassword')}
                    inputStyle={{ borderColor: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: enpasswordStatus === 1 ? 10 : 0, color: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    styleCont={{ marginTop: 0 }}
                />

                <View style={styles.wrapCheck}>
                    <CheckBox checked={select} color={select ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: select ? Colors.sky : '#DBDBDB', width: 18, height: 18, }} onPress={() => setSelect(!select)} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.Policy}>{i18n.t('agreeTo')}</Text>
                        <Text style={styles.Prill}>{i18n.t('term')}</Text>
                    </View>
                </View>
                <BTN title={i18n.t('register')} ContainerStyle={styles.LoginBtn} onPress={SubmitRegister} disabled={select} />

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
