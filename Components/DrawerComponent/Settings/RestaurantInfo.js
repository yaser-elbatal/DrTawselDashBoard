import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView, StyleSheet, Modal, Dimensions, Platform, Button, ActivityIndicator } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as ImagePicker from 'expo-image-picker';
import { Toaster } from '../../../common/Toaster';

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { useSelector, useDispatch } from 'react-redux'
import { EditProvider } from '../../../store/action/ProviderAction'
import { validateUserName } from '../../../common/Validation';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const isIOS = Platform.OS === 'ios';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function RestaurantInfo({ navigation }) {

    const user = useSelector(state => state.auth.user.data)
    const token = useSelector(state => state.auth.user.data.token)
    const [spinner, setSpinner] = useState(false);

    let mapRef = useRef(null);
    const [city, setCity] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta,
        longitudeDelta
    });


    const fetchData = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High, });
            if (user.latitude) {
                userLocation = { latitude: user.latitude, longitude: user.latitude, latitudeDelta, longitudeDelta };
            } else {
                userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };
            }
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;

        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += userLocation.latitude + ',' + userLocation.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log('MapRegion======' + mapRegion.latitude);
        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
    }, [city, mapRegion]);

    const _handleMapRegionChange = async (mapCoordinate) => {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        console.log('locations data', getCity);

        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)
            console.log("city2  ", data.results[0].formatted_address)
            console.log("city2 ", city)

        } catch (e) {
            console.log(e);
        }
    };


    const [isopened, setisopened] = useState(false)
    const [nameAR, setNameAr] = useState(user.provider.restaurant_name_ar);
    const [nameEN, setNameEN] = useState(user.provider.restaurant_name_en)
    const [from, setFrom] = useState(user.provider.preparing_time_from)
    const [to, setTo] = useState(user.provider.preparing_time_to)
    const lang = useSelector(state => state.lang.language);
    const [base64, setBase64] = useState(user.provider.cover);
    const [userImage, setUserImage] = useState(null);

    const [fromStatues, setfromStatues] = useState(0);
    const [ToStatus, setToStatus] = useState(0);
    const [nameARStatus, setnameARStatus] = useState(0);
    const [nameENStatus, setNameENStatus] = useState(0)
    const [available, setAvailable] = useState(user.provider.available)



    let image = userImage;


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

    const dispatch = useDispatch();
    function activeInput(type) {
        if (type === 'nameAr' || nameAR !== '') setnameARStatus(1);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'To' || to !== '') setToStatus(1);
        if (type === 'From' || from !== '') setfromStatues(1);

    }


    function unActiveInput(type) {
        if (type === 'nameAr' && nameAR !== '') setnameARStatus(0);
        if (type === 'nameEN' && nameEN !== '') setNameENStatus(0);
        if (type === 'To' && to !== '') setToStatus(0);
        if (type === 'From' && from === '') setfromStatues(0);


    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

    const _validate = () => {


        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        return nameEnErr || nameErr
    }
    const UpdateRestaurantInfo = () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            dispatch(EditProvider(token, lang, nameAR, nameEN, mapRegion.latitude, mapRegion.longitude, to, from, base64, available, navigation))
        }
        else {
            setSpinner(false);
            Toaster(_validate());
        }

    }

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




        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            {renderLoader()}
            <Header navigation={navigation} label={i18n.t('RestInfo')} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={_pickImage}>
                    <Image source={image != null ? { uri: image } : { uri: user.provider.cover }} style={{ width: 200, height: 150, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} />
                </TouchableOpacity>

                <InputIcon

                    label={nameARStatus === 1 ? i18n.t('ResNameAr') : null}
                    placeholder={nameARStatus === 1 ? null : i18n.t('ResNameAr')}
                    onBlur={() => unActiveInput('nameAr')}
                    onFocus={() => activeInput('nameAr')}
                    inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: nameARStatus === 1 ? 10 : 0, color: nameARStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />
                <InputIcon
                    label={nameENStatus === 1 ? i18n.t('ResNameEn') : null}
                    placeholder={nameENStatus === 1 ? null : i18n.t('ResNameEn')}
                    onBlur={() => unActiveInput('nameEN')}
                    onFocus={() => activeInput('nameEN')}
                    inputStyle={{ borderColor: nameENStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                    LabelStyle={{ paddingHorizontal: nameENStatus === 1 ? 10 : 0, color: nameENStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />


                <TouchableOpacity onPress={() => setisopened(!isopened)} style={{ height: width * .14, flexDirection: 'row', marginHorizontal: "5%", borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ color: Colors.InputColor, fontFamily: 'flatMedium', fontSize: 12 }}>{city}</Text>
                    <Image source={require('../../../assets/Images/location_gray.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
                </TouchableOpacity>


                {
                    isopened ?
                        <View style={styles.centeredView} >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isopened}   >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <MapView
                                            ref={mapRef}
                                            style={{ flex: 1, width: '100%' }}
                                            region={mapRegion}
                                            onRegionChangeComplete={region => setMapRegion(region)}
                                            customMapStyle={mapStyle}
                                            initialRegion={mapRegion}
                                            showsUserLocation={true}
                                            zoomControlEnabled={true}
                                            showsTraffic={true} >

                                            <Marker
                                                draggable
                                                coordinate={mapRegion}
                                                onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}

                                            >
                                                <Image source={require('../../../assets/Images/location_gray.png')} resizeMode={'stretch'} style={{ width: 35, height: 35 }} />
                                            </Marker>
                                        </MapView>
                                        <Button title={i18n.t('save')} onPress={() => setisopened(false)} />


                                    </View>
                                </View>


                            </Modal>
                        </View>
                        : null
                }
                <Text style={{ fontFamily: 'flatMedium', color: Colors.IconBlack, marginHorizontal: '5%' }}>{i18n.t('preparationTime')}</Text>

                <View style={{ flexDirection: 'row', }}>
                    <InputIcon
                        label={fromStatues === 1 ? i18n.t('from') : null}
                        placeholder={fromStatues === 1 ? null : i18n.t('from')}
                        onBlur={() => unActiveInput('From')}
                        onFocus={() => activeInput('From')}
                        inputStyle={{ borderColor: fromStatues === 1 ? Colors.sky : Colors.InputColor }}
                        onChangeText={(e) => setFrom(e)}
                        value={from}
                        LabelStyle={{ paddingHorizontal: fromStatues === 1 ? 10 : 0, color: fromStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                        styleCont={{ marginTop: 20, width: '40%' }}
                    />
                    <InputIcon
                        label={ToStatus === 1 ? i18n.t('to') : null}
                        placeholder={ToStatus === 1 ? null : i18n.t('to')}
                        onBlur={() => unActiveInput('To')}
                        onFocus={() => activeInput('To')}
                        inputStyle={{ borderColor: ToStatus === 1 ? Colors.sky : Colors.InputColor }}
                        onChangeText={(e) => setTo(e)}
                        value={to}
                        LabelStyle={{ paddingHorizontal: ToStatus === 1 ? 10 : 0, color: ToStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                        styleCont={{ marginTop: 20, width: '40%', }}
                    />
                </View>

                <View style={styles.Container}>
                    <Text style={styles.text}>{i18n.t('ResState')}</Text>

                    <TouchableOpacity onPress={() => setAvailable(!available)}>
                        {
                            available ?
                                <Image source={require('../../../assets/Images/on_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />
                                :
                                <Image source={require('../../../assets/Images/off_notifcatiom.png')} style={styles.BImg} resizeMode='contain' />

                        }
                    </TouchableOpacity>



                </View>
                <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={UpdateRestaurantInfo} />

            </ScrollView>

        </View >
    )
}
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
    },

    BImg: {
        height: 50,
        width: 50,
    },

    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    LoginBtn: {
        borderRadius: 5,
        marginHorizontal: '6%',
        marginVertical: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .98 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 5,
        width: width * .9,
        height: height * .75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5
    },
})
const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: '#CDCDCD'
            }
        ]
    },
    {
        elementType: "flatMedium",
        stylers: [
            {
                color: Colors.IconBlack
            }
        ]
    },
    {
        featureType: "water",
        elementType: "flatMedium",
        stylers: [
            {
                color: Colors.bg
            }
        ]
    },
    {
        featureType: "water",
        elementType: "flatMedium",
        stylers: [
            {
                color: "#E8E8E8"
            }
        ]
    }
];


export default RestaurantInfo
