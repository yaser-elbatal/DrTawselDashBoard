import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { InputIcon } from '../../common/InputText'
import { validateUserName, validateEmail, ValdiateCITyId } from '../../common/Validation'
import { Dropdown } from 'react-native-material-dropdown';
import BTN from '../../common/BTN'
import { width } from '../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { getCititis } from '../../store/action/CitiesAction'
import { UpdateProfile, GetProfile } from '../../store/action/ProfileAction'
import { Toaster } from '../../common/Toaster'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ProductDetailes } from '../../store/action/ProductAction'

function EditProfile({ navigation }) {
    const user = useSelector(state => state.auth.user.data)

    const [nameEN, setNameEN] = useState(user.name)
    const [email, setemail] = useState(user.email)
    const [city, setCity] = useState(user.provider.city)
    const [phone, setPhone] = useState(user.phone)
    const [base64, setBase64] = useState(user.avatar);
    const [userImage, setUserImage] = useState(null);

    const [spinner, setSpinner] = useState(false);

    const cities = useSelector(state => state.cities.cities)
    const lang = useSelector(state => state.lang.language);
    const token = useSelector(state => state.auth.user.data.token);
    const myProf = useSelector(state => state.profile.user.data);

    const [nameENStatus, setNameENStatus] = useState(0)
    const [emailStatues, setemailStatues] = useState(0)
    const [phoneStatus, setPhoneStatus] = useState(0);
    let image = userImage;


    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    // let CityID = cities.map(city => ({ label: city.name, }));

    const dispatch = useDispatch();

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };

    const _validate = () => {
        let nameErr = validateUserName(nameEN)
        let CityID = ValdiateCITyId(city)
        let emailErr = validateEmail(email)

        return nameErr || CityID || emailErr
    };





    function activeInput(type) {

        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'email' || email !== '') setemailStatues(1);
        if (type === 'phone' || phone !== '') setPhoneStatus(1);

    }


    function unActiveInput(type) {
        if (type === 'nameEN' && nameEN == '') setNameENStatus(0);
        if (type === 'email' && email == '') setemailStatues(0);
        if (type === 'phone' && phone === '') setPhoneStatus(0);

    }



    const UpdateData = () => {
        let val = _validate();

        if (!val) {
            setSpinner(true)
            dispatch(UpdateProfile(token, lang, nameEN, phone, email, city, base64, navigation))

        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    useEffect(() => {
        dispatch(ProductDetailes(token, lang, item.id))
        dispatch(getCititis(lang));
        dispatch(GetProfile(token, lang))

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner, dispatch]);

    function renderLoader() {
        if (spinner) {
            return (
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
            );
        }
    }
    return (
        <View style={{ flex: 1, }}>
            {renderLoader()}
            <Image source={image != null ? { uri: image } : { uri: user.avatar }} style={styles.ImgBackGround} />
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', top: 150 }} onPress={_pickImage}>
                <Image source={require('../../assets/Images/add_photo_white.png')} style={{ width: 80, height: 80, }} />
            </TouchableOpacity>



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
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>


                    <View style={{ margin: 20, marginTop: 0 }}>

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

                        <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 10 }}>
                            <Dropdown
                                placeholder={i18n.t('city')}
                                data={cityName}
                                fontSize={12}
                                itemTextStyle={{ fontFamily: 'flatMedium' }}
                                lineWidth={0}
                                containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                                animationDuration={0}
                                onChangeText={val => setCity(val)}

                                value={city}
                            />
                        </View>

                        <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={UpdateData} />



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
