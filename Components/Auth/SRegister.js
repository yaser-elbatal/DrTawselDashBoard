import React, { useEffect, useState, useRef } from 'react'
import { View, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, Modal, Image, Button, Alert } from 'react-native'
import Colors from '../../consts/Colors';
import BackBtn from '../../common/BackBtn';
import i18n from '../../locale/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { GetDepartment, getCititis } from '../../store/action/CitiesAction';
import { width, height } from '../../consts/HeightWidth';
import { InputIcon } from '../../common/InputText';
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { validateUserName, ValdiateDebId, ValdiateCITyId, ValditeCommercialRegister, ValdiateBranch } from '../../common/Validation';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';
import Container from '../../common/Container';
import * as Animatable from 'react-native-animatable';

const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;


function SRegister({ navigation, route }) {
    const dispatch = useDispatch()


    const Depatrmens = useSelector(state => state.cities.deparment);
    const lang = useSelector(state => state.lang.language);
    const cities = useSelector(state => state.cities.cities)
    const [initMap, setInitMap] = useState(true);

    let DebName = Depatrmens.map(deb => ({ label: deb.name, value: deb.id }));
    let DebId = Depatrmens.map(deb => ({ label: deb.name }));
    console.log(Depatrmens);
    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    let CityID = cities.map(city => ({ label: city.name, }));

    const [city, setCity] = useState(null);
    const [MyLocation, setLocation] = useState('');
    const [spinner, setSpinner] = useState(true);
    const [LOcation, setLOcation] = useState('')
    const [department, setDepartment] = useState(null)
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [BranchNum, setBranchNum] = useState('');
    const [CommercialRegister, setCommercialRegister] = useState('');
    const [isopened, setisopened] = useState(false)
    const [mapRegion, setMapRegion] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta,
        longitudeDelta
    });
    let mapRef = useRef(null);



    console.log(department, city);
    const _validate = () => {

        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        let CityID = city === null ? i18n.t('CityId') : null
        let DebId = department === null ? i18n.t('DepId') : null

        let ValditeCommercialRegisterErr = ValditeCommercialRegister(CommercialRegister)
        let BranchErr = ValdiateBranch(BranchNum)
        return nameErr || nameEnErr || CityID || DebId || ValditeCommercialRegisterErr || BranchErr
    }
    useEffect(() => {
    }, [MyLocation, mapRegion]);



    const _handleMapRegionChange = async (mapCoordinate) => {
        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        console.log('locations data', getCity);

        try {
            const { data } = await axios.get(getCity);
            setLOcation(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
        const { data } = await axios.get(getCity);
        setLOcation(data.results[0].formatted_address)
    };

    const fetchData = async () => {

        // const { status, } = await Permissions.askAsync(Permissions.LOCATION);

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');

        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});


            userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };
            setInitMap(false);

            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;

        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += userLocation.latitude + ',' + userLocation.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log("getCity  ", getCity)
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setLOcation(data.results[0].formatted_address)
            // console.log("city  " , data.results[0].formatted_address)
            // console.log("city  " , city)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            setSpinner(true)

            fetchData();
            dispatch(GetDepartment(lang))
            dispatch(getCititis(lang)).then(() => setSpinner(false)).catch((e) => { setSpinner(false); console.warn(e); })
        });

        return unsubscribe;
    }, [navigation])




    const NavigateToNextLocation = () => {
        let val = _validate()
        if (!val) {
            navigation.navigate('TRegister', {
                name: route.params.name,
                phone: route.params.phone,
                email: route.params.email,
                isowner: route.params.isowner,
                password: route.params.password,
                department: department,
                nameAR: nameAR,
                nameEN: nameEN,
                city: city,
                BranchNum: BranchNum,
                CommercialRegister: CommercialRegister,
                MyLocation: LOcation,
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude
            })
        }
        else {
            Toaster(_validate());

        }
    }

    return (

        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>
            <BackBtn navigation={navigation} />
            <View style={{ flexDirection: 'column', paddingStart: '5%' }}>
                <Animatable.Text animation='bounceIn' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('createAcc')}</Animatable.Text>
                <Animatable.Text animation='bounceIn' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('Activity')}</Animatable.Text>
                <Animatable.Text animation='bounceIn' easing="ease-out" delay={500} style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('storeInfo')}</Animatable.Text>
            </View>

            <Container loading={spinner}>

                <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 10 }}>
                    <Dropdown
                        placeholder={i18n.t('dep')}
                        data={DebName}
                        fontSize={16}
                        labelFontSize={16}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        itemTextStyle={{ fontSize: 18, fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                        animationDuration={0}
                        onChangeText={val => setDepartment(val)}
                        value={DebId.label}
                    />
                </View>

                <InputIcon
                    label={i18n.t('ResNameAr')}
                    placeholder={i18n.t('ResNameAr')}

                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    styleCont={{ marginTop: 20 }}
                />
                <InputIcon
                    label={i18n.t('ResNameEn')}
                    placeholder={i18n.t('ResNameEn')}

                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}

                />
                <InputIcon
                    label={i18n.t('Location')}
                    placeholder={i18n.t('Location')}
                    onChangeText={(e) => setLOcation(e)}
                    value={LOcation}
                    styleCont={{ marginTop: 0 }}
                    image={require('../../assets/Images/location_gray.png')}
                    onPress={mapRegion.latitude != null ? () => setisopened(true) : () => setisopened(false)}
                />

                {

                    isopened ?
                        <View style={styles.centeredView} >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isopened}   >
                                {

                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>

                                            <MapView
                                                style={{ flex: 1, width: '100%', backgroundColor: Colors.bg }}
                                                region={mapRegion}
                                                ref={mapRef}
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
                                                    <Image source={require('../../assets/Images/circleblue.png')} resizeMode='contain' style={{ width: 35, height: 35 }} />
                                                </Marker>
                                            </MapView>
                                            <Animatable.View animation='lightSpeedIn' easing="ease-out" delay={500}>
                                                <Button title={i18n.t('save')} onPress={() => setisopened(false)} />
                                            </Animatable.View>

                                        </View>
                                    </View>

                                }


                            </Modal>
                        </View>
                        : null
                }

                <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', }}>
                    <Dropdown
                        placeholder={i18n.t('city')}
                        data={cityName}
                        fontSize={16}
                        labelFontSize={16}
                        itemTextStyle={{ fontFamily: 'flatMedium', fontSize: 16 }}
                        lineWidth={0}
                        containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                        animationDuration={0}
                        onChangeText={val => setCity(val)}

                        value={CityID.label}
                    />
                </View>

                <InputIcon
                    label={i18n.t('branchNum')}
                    placeholder={i18n.t('branchNum')}
                    keyboardType='numeric'
                    onChangeText={(e) => setBranchNum(e)}
                    value={BranchNum}
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
                <BTN title={i18n.t('continue')} ContainerStyle={styles.LoginBtn} onPress={NavigateToNextLocation} />
            </Container>
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
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
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
export default SRegister
