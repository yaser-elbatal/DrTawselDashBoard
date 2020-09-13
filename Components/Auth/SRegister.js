import React, { useEffect, useState, useRef } from 'react'
import { View, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, Modal, Image, Button } from 'react-native'
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
import { validateUserName } from '../../common/Validation';
import BTN from '../../common/BTN';

const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;


function SRegister({ navigation }) {
    const dispatch = useDispatch()

    const Depatrmens = useSelector(state => state.cities.deparment);
    const lang = useSelector(state => state.lang.language);
    const cities = useSelector(state => state.cities.cities)

    let DebName = Depatrmens.map(deb => ({ label: deb.name, value: deb.id }));
    let DebId = Depatrmens.map(deb => ({ label: deb.name }));

    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    let CityID = cities.map(city => ({ label: city.name, }));

    let mapRef = useRef(null);
    const [city, setCity] = useState('');
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

    const [spinner, setSpinner] = useState(false);


    const [nameARStatus, setnameARStatus] = useState(0);
    const [nameENStatus, setNameENStatus] = useState(0);
    const [BranchStatues, setBranchStatues] = useState(0);
    const [CommercialRegisterStatues, setCommercialRegisterstatues] = useState(0)


    function activeInput(type) {
        if (type === 'nameAR' || nameAR !== '') setnameARStatus(1);
        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'branch' || nameEN !== '') setBranchStatues(1);
        if (type === 'CommercialRegister' || CommercialRegister !== '') setCommercialRegisterstatues(1);


    }
    function unActiveInput(type) {
        if (type === 'nameAR' && nameAR === '') setnameARStatus(0);
        if (type === 'nameEN' && nameEN === '') setNameENStatus(0);
        if (type === 'branch' && BranchNum === '') setBranchStatues(0);
        if (type === 'CommercialRegister' && CommercialRegister === '') setCommercialRegisterstatues(0);


    }

    const _validate = () => {

        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        return nameErr || nameEnErr
    }
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

    const fetchData = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High, });
            if (latitude) {
                userLocation = { latitude: latitude, longitude: latitude, latitudeDelta, longitudeDelta };
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
        dispatch(GetDepartment(lang))
        dispatch(getCititis(lang));


    }, [])

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
                <Text style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('storeInfo')}</Text>
            </View>
            <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 10 }}>
                <Dropdown
                    placeholder={i18n.t('dep')}
                    data={DebName}
                    fontSize={12}
                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                    lineWidth={0}
                    containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                    animationDuration={0}
                    onChangeText={val => setDepartment(val)}
                    value={DebId.label}
                />
            </View>

            <InputIcon
                label={nameARStatus === 1 ? i18n.t('username') : null}
                placeholder={nameARStatus === 1 ? null : i18n.t('username')}
                onBlur={() => unActiveInput('nameAR')}
                onFocus={() => activeInput('nameAR')}
                inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setNameAr(e)}
                value={nameAR}
                styleCont={{ marginTop: 20 }}
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
            <TouchableOpacity onPress={() => setisopened(!isopened)} style={{ height: width * .14, flexDirection: 'row', marginHorizontal: "5%", borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <Text style={{ color: Colors.InputColor, fontFamily: 'flatMedium', fontSize: 12 }}>{city}</Text>
                <Image source={require('../../assets/Images/location_gray.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
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
                                    {
                                        mapRegion.latitude != null ? (
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
                                                    <Image source={require('../../assets/Images/location_gray.png')} resizeMode={'stretch'} style={{ width: 35, height: 35 }} />
                                                </Marker>
                                            </MapView>
                                        ) : <View />
                                    }
                                    <Button title={i18n.t('save')} onPress={() => setisopened(false)} />


                                </View>
                            </View>


                        </Modal>
                    </View>
                    : null
            }

            <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 20 }}>
                <Dropdown
                    placeholder={i18n.t('city')}
                    data={cityName}
                    fontSize={12}
                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                    lineWidth={0}
                    containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                    animationDuration={0}
                    onChangeText={val => setCity(val)}

                    value={CityID.label}
                />
            </View>

            <InputIcon
                label={BranchStatues === 1 ? i18n.t('branchNum') : null}
                placeholder={BranchStatues === 1 ? null : i18n.t('branchNum')}
                onBlur={() => unActiveInput('branch')}
                onFocus={() => activeInput('branch')}
                inputStyle={{ borderColor: BranchStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setBranchNum(e)}
                value={BranchNum}
                styleCont={{ marginTop: 20 }}
                LabelStyle={{ paddingHorizontal: BranchStatues === 1 ? 10 : 0, color: BranchStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

            />
            <InputIcon
                label={CommercialRegisterStatues === 1 ? i18n.t('CommercialRegister') : null}
                placeholder={CommercialRegisterStatues === 1 ? null : i18n.t('CommercialRegister')}
                onBlur={() => unActiveInput('CommercialRegister')}
                onFocus={() => activeInput('CommercialRegister')}
                inputStyle={{ borderColor: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor }}
                onChangeText={(e) => setCommercialRegister(e)}
                value={CommercialRegister}
                styleCont={{ marginTop: 0 }}
                LabelStyle={{ paddingHorizontal: CommercialRegisterStatues === 1 ? 10 : 0, color: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

            />
            <BTN title={i18n.t('continue')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('TRegister')} />

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
