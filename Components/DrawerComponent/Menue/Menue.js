import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, FlatList, ScrollView, TouchableOpacity, Modal, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { CheckBox } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';

import { Toast } from "native-base";


import HomeHeader from '../../../common/HomeHeader'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import { InputIcon } from '../../../common/InputText';
import { width, height } from '../../../consts/HeightWidth';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { MenueInfo, AddMenue, DeleteMenue, UpdateMenue, SearchMenue } from '../../../store/action/MenueAction';
import { Toaster } from '../../..//common/Toaster';
import { validateUserName } from '../../../common/Validation';
import Container from '../../../common/Container';
import * as Animatable from 'react-native-animatable';

function Menue({ navigation, route }) {


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue ? state.menue.menue.data : []);
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [DeleteArr, setDeleteArr] = useState([]);
    const [MenueData, setMenueData] = useState()
    const [spinner, setSpinner] = useState(false);
    const [Search, setSearch] = useState('');
    const [nameAREdit, setNameArEdit] = useState();
    const [nameENEdit, setNameENEdit] = useState();

    const [isSelected2, setSelection2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [EditMaodVisible, setEditMaodVisible] = useState(false);
    const [Loader, setLoader] = useState(true)


    const data2 = [{
        label: i18n.t('latest'),
        value: 1,
    }, {
        label: i18n.t('oldest'),
        value: 2,
    },];



    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setLoader(true)
            setSelection2(false);


            dispatch(MenueInfo(lang, token)).then(() => setLoader(false))
        });

        if (route.params) {
            Toast.show({
                text: i18n.t('AddMen'),
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }
            });
        }

        return unsubscribe;
    }, [navigation, route]);


    const _validate = () => {


        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        return nameErr || nameEnErr
    }

    const dispatch = useDispatch();

    const Add_menue = async () => {
        let val = _validate()
        if (!val) {
            setLoader(true)
            dispatch(AddMenue(token, lang, nameAR, nameEN)).then(() => dispatch(MenueInfo(lang, token)).then(() => setLoader(false)))


            setModalVisible(false)
            setNameAr('');
            setNameEN('')
        }
        else {
            Toaster(_validate());

        }
    }

    const edit = (item) => {
        setEditMaodVisible(true)
        setNameArEdit(item.name_ar);
        setNameENEdit(item.name_en);
        setMenueData(item.id);

    }

    const DeleteMeueIteM = (id) => {
        setLoader(true)
        dispatch(DeleteMenue(token, id)).then(() => dispatch(MenueInfo(lang, token)).then(() => setSelection2(false), setLoader(false)))
        setDeleteArr([])

    }

    const EditMEnue = () => {
        setLoader(true);
        dispatch(UpdateMenue(token, lang, nameAREdit, nameENEdit, MenueData)).then(() => dispatch(MenueInfo(lang, token))).then(() => setLoader(false))

        setEditMaodVisible(false)
    }


    const isChecked = (itemId) => {
        const isThere = DeleteArr.includes(itemId);
        return isThere;
    };

    const toggleChecked = (itemId) => {

        if (isChecked(itemId)) {

            let Deleted = DeleteArr.filter((id) => id !== itemId);
            setDeleteArr(Deleted)


        } else {
            setDeleteArr(DeleteArr.concat([itemId]))

        }

    };



    const handleChange = (e) => {
        setLoader(true)

        setSearch(e);


        if (e == '') {
            setLoader(true)
            dispatch(MenueInfo(lang, token)).then(() => setLoader(false))


        }
        setTimeout(() => dispatch(SearchMenue(token, e, lang)).then(() => setLoader(false)), 1000)

    }


    const DeleteMenueMultiIteM = () => {
        setLoader(true)
        dispatch(DeleteMenue(token, DeleteArr)).then(() => dispatch(MenueInfo(lang, token)).then(() => setSelection2(false), setLoader(false)))
        setDeleteArr([])
    }


    const handleChandDrpDown = (val) => {
        setSpinner(true)
        val == 1 ?
            Menue.reverse()
            : Menue
        setSpinner(false)


    }

    const SelectAllChecked = () => {
        if (isSelected2) {
            setSelection2(false);
            setDeleteArr([])
        }

        else {
            setSelection2(true);
            let MnueID = Menue ? Menue.map(menu => menu.id) : []
            setDeleteArr(MnueID)
        }
    }


    return (

        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
            <HomeHeader navigation={navigation} label={i18n.t('menue')} onPress={() => navigation.navigate('MyProfile')} />



            <InputIcon
                placeholder={i18n.t('search1')}
                label={i18n.t('search1')}
                value={Search}
                onChangeText={(e) => handleChange(e)}
                image={require('../../../assets/Images/search.png')}
                styleCont={{ marginTop: 0, height: 70, }}
                inputStyle={{ borderRadius: 10, }}
            />

            <Card />

            <View style={{ height: 50, width: '90%', margin: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 10, backgroundColor: '#F6F6F6', }}>
                <TouchableOpacity onPress={SelectAllChecked} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, marginStart: -5, borderRadius: 5 }} onPress={SelectAllChecked} />
                    <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 15, color: Colors.inputTextMainColor }}>{i18n.t('Select')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={DeleteArr.length == 0 ?
                    () => Toast.show({
                        text: i18n.t('SelectElement'),
                        type: "danger",
                        duration: 3000,
                        textStyle: {
                            color: "white",
                            textAlign: 'center'
                        }
                    })
                    : DeleteMenueMultiIteM} style={{ borderWidth: .4, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', borderColor: Colors.InputColor, }}>
                    <Text style={{ fontFamily: 'flatMedium', paddingVertical: 5, paddingHorizontal: 15, color: Colors.inputTextMainColor }}> {i18n.t('delete')}</Text>
                </TouchableOpacity>



                <Text style={{ fontFamily: 'flatMedium', fontSize: width * .03, paddingHorizontal: 2, color: Colors.inputTextMainColor }}>{i18n.t('filter')}</Text>
                <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                    <Dropdown
                        placeholder={i18n.t('select')}
                        data={data2}
                        style={{ fontFamily: 'flatMedium', }}
                        animationDuration={0}
                        onChangeText={(val) => handleChandDrpDown(val)}
                        fontSize={12}

                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: width * .22, paddingHorizontal: 8, bottom: 10 }}
                    />
                </View>

            </View>


            <BTN title={i18n.t('AddMenue')} ContainerStyle={[styles.LoginBtn, { marginHorizontal: 18, marginVertical: 15 }]} onPress={() => setModalVisible(!modalVisible)} />



            <Container loading={Loader} >
                {
                    !Menue ?
                        <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                        : !Menue.length ?
                            <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Menue}
                                extraData={Loader}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item, index }) =>


                                    (
                                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>

                                            <View style={styles.Card} key={index}>
                                                <View style={styles.FWrab}>
                                                    <CheckBox checked={isChecked(item.id)} color={isChecked(item.id) ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isChecked(item.id) ? Colors.sky : Colors.bg, marginStart: -10, borderRadius: 5 }} onPress={() => toggleChecked(item.id)} />
                                                    <Text style={styles.nText}>{i18n.t('num')} # {item.id}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.name, { color: Colors.IconBlack }]}>{i18n.t('name')} :   </Text>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.SWarb}>
                                                    <TouchableOpacity style={styles.Edit} onPress={() => edit(item)}>
                                                        <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.Delete} onPress={() => DeleteMeueIteM(item.id)}>
                                                        <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                                    </TouchableOpacity>

                                                </View>

                                            </View>
                                        </Animatable.View>
                                    )
                                } />
                }



                <TouchableOpacity style={styles.centeredView} onPress={() => setEditMaodVisible(false)}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={{ backgroundColor: Colors.bg, }}
                        visible={EditMaodVisible} >

                        <TouchableOpacity style={styles.centeredView} onPress={() => setEditMaodVisible(false)}>
                            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ backgroundColor: 'white', }}>

                                <View style={styles.modalView}>
                                    <View style={{ margin: 20, backgroundColor: Colors.bg }}>
                                        <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('edit')} </Text>

                                        <InputIcon

                                            label={i18n.t('menueAr')}
                                            placeholder={i18n.t('menueAr')}
                                            onChangeText={(e) => setNameArEdit(e)}
                                            value={nameAREdit}
                                        />

                                        <InputIcon
                                            label={i18n.t('menueEn')}
                                            placeholder={i18n.t('menueEn')}
                                            onChangeText={(e) => setNameENEdit(e)}
                                            value={nameENEdit}
                                            styleCont={{ marginTop: -5 }}
                                        />

                                        <BTN title={i18n.t('edit')} ContainerStyle={styles.LoginBtn} onPress={EditMEnue} />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </TouchableOpacity>
                    </Modal>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    style={{ backgroundColor: Colors.bg, }}
                    visible={modalVisible} >

                    <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)} >
                        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ backgroundColor: 'white', }}>

                            <View style={styles.modalView}>
                                <View style={{ margin: 20, backgroundColor: Colors.bg }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, marginHorizontal: 15 }}>{i18n.t('AddMenue')} </Text>

                                    <InputIcon
                                        label={i18n.t('menueAr')}
                                        placeholder={i18n.t('menueAr')}
                                        onChangeText={(e) => setNameAr(e)}
                                        value={nameAR}
                                    />

                                    <InputIcon
                                        label={i18n.t('menueEn')}
                                        placeholder={i18n.t('menueEn')}
                                        onChangeText={(e) => setNameEN(e)}
                                        value={nameEN}
                                        styleCont={{ marginTop: -5 }}
                                    />

                                    <BTN title={i18n.t('AddMenue')} ContainerStyle={styles.LoginBtn} onPress={Add_menue} />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </Modal>
            </Container>
        </ScrollView >

    )
}
const styles = StyleSheet.create({
    wrab: {
        overflow: 'hidden',
    },
    Linear: {
        height: width * .32,
        justifyContent: 'center',
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        width: width * .27,

        marginHorizontal: 5

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 15,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 0,
        width: '91%',
    },
    Card: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        width: '90%',
        marginStart: 20,
        marginVertical: 5,
        shadowColor: Colors.bg,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    FWrab: {
        flexDirection: 'column',
        margin: 5,
        flex: .75,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    nText: {
        color: Colors.sky,
        paddingVertical: 10,
        fontFamily: 'flatMedium',
    },
    nMenue: {
        fontFamily: 'flatMedium',
        fontSize: 12,
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    SWarb: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: .25,
    },
    Edit: {
        backgroundColor: '#E3E3E3',
        height: '50%',
        justifyContent: 'center',
        width: 30
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        height: '50%',
        justifyContent: 'center', width: 30
    },
    Img: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: Colors.bg,
        // opacity: Platform.OS = 'ios' ? .7 : .7,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
})


export default Menue
