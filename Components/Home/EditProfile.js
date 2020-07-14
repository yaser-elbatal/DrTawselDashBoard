import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { InputIcon } from '../../common/InputText'
import { validateUserName, validatePhone, validatePassword, validateEmail, validateCode } from '../../common/Validation'
import { Picker } from 'native-base';
import BTN from '../../common/BTN'

function EditProfile({ navigation }) {


    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('info@gamil.com')

    const [isSelected, setSelection] = useState();
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
        <View style={{ flex: 1, }}>

            <Image source={require('../../assets/Images/imagethree.png')} style={styles.ImgBackGround} />
            <Image source={require('../../assets/Images/add_photo_white.png')} style={{ alignSelf: 'center', top: 150, position: 'absolute', width: 80, height: 80, }} />



            <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.ScrolContainer}>
                <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, marginTop: 0 }}>

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
                            value='011111111111'
                            styleCont={{ marginTop: 0 }}
                        />
                        <View style={styles.DrbContain}>
                            <Picker
                                mode="dropdown"
                                style={{ width: '90%', color: Colors.fontNormal, marginHorizontal: 5 }}
                                placeholder={i18n.t('city')}
                                placeholderStyle={{ color: Colors.IconBlack }}
                                placeholderIconColor={Colors.IconBlack}
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
        bottom: 90,
        opacity: .7
    },

    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: "5%"
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default EditProfile
