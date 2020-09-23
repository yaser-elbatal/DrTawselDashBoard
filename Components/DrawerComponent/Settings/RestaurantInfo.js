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
import { validateUserName, ValditeCommercialRegister } from '../../../common/Validation';
import Container from '../../../common/Container';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const isIOS = Platform.OS === 'ios';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function RestaurantInfo({ navigation }) {

    const user = useSelector(state => state.auth.user.data)
    const token = useSelector(state => state.auth.user.data.token)
    const [spinner, setSpinner] = useState(false);
    let mapRef = useRef();
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
            // isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;

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
        fetchData().then(() => setSpinner(false))
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
    const [city, setCity] = useState(user.address);
    const [BranchNum, setBranchNum] = useState(`${user.provider.num_of_branches}`);
    const [CommercialRegister, setCommercialRegister] = useState(user.provider.commercial_register);
    const [selecCommerical, setselecCommerical] = useState(user.provider.authorization_commercial);
    const [SelectDelivery, setSelectDelivery] = useState(user.provider.available_delivery)
    const [selectedRadion, setSelectedRadio] = useState(user.provider.is_owner)
    const [WebUrl, setWebUrl] = useState(user.provider.website_url);

    const [data, setData] = useState([

        { id: 0, title: `${i18n.t("no")}` },
        { id: 1, title: `${i18n.t("yes")}` },

    ])




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



    const _validate = () => {


        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        let UrlErr = WebUrl === '' ? i18n.t('webUrl') : null
        let SelectDeliveryErr = SelectDelivery === null ? i18n.t('SelectYN') : null;
        let selecCommericalErr = selecCommerical === null ? i18n.t('SelectYN') : null;
        let ValditeCommercialRegisterErr = ValditeCommercialRegister(CommercialRegister)

        return nameEnErr || nameErr || UrlErr || SelectDeliveryErr || selecCommericalErr || ValditeCommercialRegisterErr
    }
    const UpdateRestaurantInfo = () => {
        let val = _validate()

        if (!val) {
            setSpinner(true)
            dispatch(EditProvider(token, lang, nameAR, nameEN, mapRegion.latitude, mapRegion.longitude, city, WebUrl, CommercialRegister, selectedRadion, selecCommerical, SelectDelivery, BranchNum, from, to, base64, available, navigation))
        }
        else {
            setSpinner(false);
            Toaster(_validate());
        }

    }


    return (



        <Container loading={spinner}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
                <Header navigation={navigation} label={i18n.t('RestInfo')} />
                <TouchableOpacity onPress={_pickImage}>
                    <Image source={{ uri: user.provider.cover }} style={{ width: 200, height: 150, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} />
                </TouchableOpacity>

                <InputIcon

                    label={i18n.t('ResNameAr')}
                    placeholder={i18n.t('ResNameAr')}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                />
                <InputIcon
                    label={i18n.t('ResNameEn')}
                    placeholder={i18n.t('ResNameEn')}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                />

                <InputIcon
                    label={i18n.t('city')}
                    placeholder={i18n.t('city')}
                    onChangeText={(e) => setCity(e)}
                    value={city}
                    styleCont={{ marginTop: 0 }}
                    image={require('../../../assets/Images/location_gray.png')}
                    onPress={() => setisopened(!isopened)}
                />





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


                <InputIcon
                    label={i18n.t('webUrl')}
                    placeholder={i18n.t('Url')}

                    dataDetectorTypes={'link'}
                    multiline={true}
                    onChangeText={(e) => setWebUrl(e)}
                    value={WebUrl}
                    styleCont={{ marginTop: 20 }}
                />
                <InputIcon
                    label={i18n.t('CommercialRegister')}
                    placeholder={i18n.t('CommercialRegister')}

                    keyboardType='numeric'

                    onChangeText={(e) => setCommercialRegister(e)}
                    value={CommercialRegister}
                    styleCont={{ marginTop: 0 }}

                />
                <InputIcon
                    label={i18n.t('branchNum')}
                    placeholder={i18n.t('branchNum')}

                    keyboardType='numeric'

                    onChangeText={(e) => setBranchNum(e)}
                    value={BranchNum}
                    styleCont={{ marginTop: 0 }}

                />
                <Text style={{ fontFamily: 'flatMedium', color: Colors.IconBlack, marginHorizontal: '5%' }}>{i18n.t('preparationTime')}</Text>

                <View style={{ flexDirection: 'row', }}>
                    <InputIcon
                        label={i18n.t('from')}
                        placeholder={i18n.t('from')}

                        onChangeText={(e) => setFrom(e)}
                        value={from}
                        styleCont={{ marginTop: 20, width: '40%' }}
                    />
                    <InputIcon
                        label={i18n.t('to')}
                        placeholder={i18n.t('to')}

                        onChangeText={(e) => setTo(e)}
                        value={to}
                        styleCont={{ marginTop: 20, width: '40%', }}
                    />
                </View>


                <View style={{ height: width * .14, marginHorizontal: '5%', borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: .75, fontFamily: 'flatMedium', paddingStart: 10 }}>
                        <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('owner')}</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setSelectedRadio(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, flex: .15 }}>
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




                <View style={{ height: width * .14, marginHorizontal: '5%', flex: 1, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ flex: .75, fontFamily: 'flatMedium', paddingStart: 10, flex: .9, fontSize: 10, }}>
                        <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('Franch')}</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setselecCommerical(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, flex: .19 }}>
                                    <View style={{
                                        height: 15,
                                        width: 15,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: selecCommerical === index ? Colors.sky : Colors.fontNormal,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',

                                    }}>
                                        {
                                            selecCommerical === index ?
                                                <View style={{
                                                    height: 6,
                                                    width: 6,
                                                    borderRadius: 6,
                                                    backgroundColor: Colors.sky,
                                                }} />
                                                : null
                                        }
                                    </View>
                                    <Text style={[styles.sText, { color: selecCommerical === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                <View style={{ height: width * .14, marginHorizontal: '5%', marginTop: 20, borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: .75, flex: .9, fontFamily: 'flatMedium', paddingStart: 10 }}>
                        <Text style={{ color: Colors.inputTextMainColor }}>{i18n.t('DeliveryServ')}</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => { setSelectDelivery(index) }} key={index + 1} style={{ flexDirection: 'row', justifyContent: 'center', flex: .28 }}>
                                    <View style={{
                                        height: 15,
                                        width: 15,
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: SelectDelivery === index ? Colors.sky : Colors.fontNormal,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',

                                    }}>
                                        {
                                            SelectDelivery === index ?
                                                <View style={{
                                                    height: 6,
                                                    width: 6,
                                                    borderRadius: 6,
                                                    backgroundColor: Colors.sky,
                                                }} />
                                                : null
                                        }
                                    </View>
                                    <Text style={[styles.sText, { color: SelectDelivery === index ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }

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
        </Container>

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
